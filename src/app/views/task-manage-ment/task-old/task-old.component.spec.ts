import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOldComponent } from './task-old.component';

describe('TaskComponent', () => {
  let component: TaskOldComponent;
  let fixture: ComponentFixture<TaskOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
