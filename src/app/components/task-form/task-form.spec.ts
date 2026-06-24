import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskForm } from './task-form';

describe('TaskForm', () => {
  let component: TaskForm;
  let fixture: ComponentFixture<TaskForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the task title when the form is submitted', () => {
    let emittedTitle = '';
    component.taskSubmitted.subscribe((title) => {
      emittedTitle = title;
    });

    component.form.setValue({
      title: 'Write tests',
    });

    component.submit();

    expect(emittedTitle).toBe('Write tests');
  });
});
