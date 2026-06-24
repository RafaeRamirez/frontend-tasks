import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDashboardComponent } from './task-dashboard.component';

describe('TaskDashboardComponent', () => {
  let component: TaskDashboardComponent;
  let fixture: ComponentFixture<TaskDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDashboardComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the dashboard heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Gestion de tareas');
  });
});
