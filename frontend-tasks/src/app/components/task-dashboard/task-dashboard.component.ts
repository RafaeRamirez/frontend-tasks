import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task';
import { TaskForm } from '../task-form/task-form';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [CommonModule, TaskForm],
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css'],
})
export class TaskDashboardComponent implements OnInit {
  public tasks: Task[] = [];
  public loading = false;
  public creating = false;
  public errorMessage = '';
  public editingTaskId: string | null = null;
  public readonly pendingTaskIds = new Set<string>();

  constructor(private readonly taskService: TaskService) {}

  public ngOnInit(): void {
    this.loadTasks();
  }

  public loadTasks(): void {
    this.loading = true;
    this.errorMessage = '';

    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar la lista de tareas.';
        this.loading = false;
      },
    });
  }

  public createTask(title: string): void {
    this.creating = true;
    this.errorMessage = '';

    this.taskService.createTask(title).subscribe({
      next: (task) => {
        this.tasks = [task, ...this.tasks];
        this.creating = false;
        this.errorMessage = '';
      },
      error: () => {
        this.creating = false;
        this.errorMessage = 'No se pudo crear la tarea.';
      },
    });
  }

  public startEditing(task: Task): void {
    this.editingTaskId = task.id;
    this.errorMessage = '';
  }

  public cancelEditing(): void {
    this.editingTaskId = null;
  }

  public updateTask(task: Task, title: string): void {
    this.pendingTaskIds.add(task.id);
    this.errorMessage = '';

    this.taskService.updateTask({ ...task, title }).subscribe({
      next: (updatedTask) => {
        this.tasks = this.tasks.map((currentTask) =>
          currentTask.id === updatedTask.id ? updatedTask : currentTask,
        );
        this.pendingTaskIds.delete(task.id);
        this.editingTaskId = null;
        this.errorMessage = '';
      },
      error: () => {
        this.pendingTaskIds.delete(task.id);
        this.errorMessage = 'No se pudo actualizar la tarea.';
      },
    });
  }

  public completeTask(task: Task): void {
    if (task.status === 'completed') {
      return;
    }

    this.pendingTaskIds.add(task.id);
    this.errorMessage = '';

    this.taskService.completeTask(task.id).subscribe({
      next: (completedTask) => {
        this.tasks = this.tasks.map((currentTask) =>
          currentTask.id === completedTask.id ? completedTask : currentTask,
        );
        this.pendingTaskIds.delete(task.id);
        this.errorMessage = '';
      },
      error: () => {
        this.pendingTaskIds.delete(task.id);
        this.errorMessage = 'No se pudo completar la tarea.';
      },
    });
  }

  public deleteTask(task: Task): void {
    if (!window.confirm(`¿Eliminar la tarea "${task.title}"?`)) {
      return;
    }

    this.pendingTaskIds.add(task.id);
    this.errorMessage = '';

    this.taskService.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((currentTask) => currentTask.id !== task.id);
        this.pendingTaskIds.delete(task.id);
        if (this.editingTaskId === task.id) {
          this.editingTaskId = null;
        }
        this.errorMessage = '';
      },
      error: () => {
        this.pendingTaskIds.delete(task.id);
        this.errorMessage = 'No se pudo eliminar la tarea.';
      },
    });
  }

  public isTaskPending(taskId: string): boolean {
    return this.pendingTaskIds.has(taskId);
  }
}
