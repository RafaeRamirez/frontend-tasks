import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnChanges {
  @Input() initialTitle = '';
  @Input() submitLabel = 'Guardar';
  @Input() placeholder = 'Escribe una tarea';
  @Input() showCancel = false;
  @Input() disabled = false;
  @Output() taskSubmitted = new EventEmitter<string>();
  @Output() cancelled = new EventEmitter<void>();

  readonly form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  readonly isSubmitting = signal(false);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialTitle']) {
      this.form.reset({ title: this.initialTitle });
    }

    if (changes['disabled']) {
      if (this.disabled) {
        this.form.disable({ emitEvent: false });
      } else {
        this.form.enable({ emitEvent: false });
      }
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const title = this.form.getRawValue().title.trim();
    this.taskSubmitted.emit(title);
    this.form.reset({ title: '' });
    this.isSubmitting.set(false);
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
