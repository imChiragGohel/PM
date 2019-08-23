import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNavigationComponent } from './task-navigation.component';

describe('TaskNavigationComponent', () => {
  let component: TaskNavigationComponent;
  let fixture: ComponentFixture<TaskNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
