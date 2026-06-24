import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { Task } from '../models/task.model';
import { TaskService } from './task';

describe('TaskService', () => {
  let service: TaskService;
  let httpController: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/tasks`;
  const task: Task = {
    id: 'task-1',
    title: 'Probar servicio',
    status: 'pending',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TaskService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('obtiene todas las tareas', () => {
    service.getTasks().subscribe((tasks) => expect(tasks).toEqual([task]));

    const request = httpController.expectOne(apiUrl);
    expect(request.request.method).toBe('GET');
    request.flush([task]);
  });

  it('obtiene una tarea por id', () => {
    service.getTaskById(task.id).subscribe((result) => expect(result).toEqual(task));

    const request = httpController.expectOne(`${apiUrl}/${task.id}`);
    expect(request.request.method).toBe('GET');
    request.flush(task);
  });

  it('crea una tarea', () => {
    service.createTask(task.title).subscribe((result) => expect(result).toEqual(task));

    const request = httpController.expectOne(apiUrl);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ title: task.title });
    request.flush(task);
  });

  it('actualiza una tarea', () => {
    service.updateTask(task).subscribe((result) => expect(result).toEqual(task));

    const request = httpController.expectOne(`${apiUrl}/${task.id}`);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual({
      title: task.title,
      status: task.status,
    });
    request.flush(task);
  });

  it('marca una tarea como completada', () => {
    const completedTask: Task = { ...task, status: 'completed' };

    service.completeTask(task.id).subscribe((result) => expect(result).toEqual(completedTask));

    const request = httpController.expectOne(`${apiUrl}/${task.id}/complete`);
    expect(request.request.method).toBe('PATCH');
    request.flush(completedTask);
  });

  it('elimina una tarea', () => {
    service.deleteTask(task.id).subscribe((result) => expect(result).toBeNull());

    const request = httpController.expectOne(`${apiUrl}/${task.id}`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });
});
