import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskManagementService } from '../task-management.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-task-old',
  templateUrl: './task-old.component.html',
  styleUrls: ['./task-old.component.scss'
  ]
})
export class TaskOldComponent implements OnInit, OnDestroy {

  //#region Properties
  lst_task: any = [];
  clickIndex: any = -1;
  editData: any;
  addTaskComponent: any = false;
  addTaskArray: FormGroup;
  //#endregion

  //#region Functions
  onGetTaskList = () => {
    // this.addTaskArray.patchValue(this.projects,)
    this.addTaskArray.reset({}, { emitEvent: false });
    this.projects.clear();
    this._cs.displayLoader(true);
    let res = this._tms.getTaskList();
    this.lst_task = res;
    this.subscription.forEach(x => x.unsubscribe());
    for (let i = 0; i < this.lst_task.length; i++) {
      const project = this.lst_task[i];
      this.projects.push(this._fb.group({
        projectId: project.projectId,
        projectName: project.projectName,
        type: project.type,
        descriptions: project.descriptions,
        createdate: project.createdate,
        listOfTask: this._fb.array([])
      }));
      const lastIndex = this.projects.length - 1;
      const data = this.listOfTask(lastIndex);
      for (let j = 0; j < project.listOfTask.length; j++) {
        const tasks = project.listOfTask[j];
        data.push(this._fb.group({
          id: tasks.id,
          name: tasks.name,
          descriptions: tasks.descriptions,
          status: tasks.status, //Active
          startDate: tasks.startDate,
          endDate: tasks.endDate,
        }));
      }
    };
    this._cs.displayLoader(false);
    this.subscription.push(this.addTaskArray.get('projects').valueChanges.subscribe(res => {
      if (res.length > 0) {
        this.onTaskEdit(res);
      }
    }))
  };

  plus(index) {
    this.clickIndex = this.clickIndex == index ? -1 : index;
  };

  onAddTask() {
    this.addTaskComponent = true;
  };

  onModalClose(event) {
    if (event) {
      this.clickIndex = -1;
      this._cs.displayLoader(true);
      this.addTaskComponent = event.isModalClose;
      this._cs.displayLoader(false);
      this.onGetTaskList();
    }
  };

  onDeleteTask(taskWithProject, Task) {
    var projectIndex = this._tms.getTaskIndexByProjectId(taskWithProject.projectId);
    var taskIndex = this._tms.getTaskIndexByTaskId(projectIndex, Task.id);
    if (projectIndex > -1 && taskIndex > -1) {
      this._tms.onTaskDelete(projectIndex, taskIndex);
      this._cs.displayToastr('Task deleted successfully', 'Delete', this._cs.toaster_Obj.success);
    };
    this.onGetTaskList();
  };

  get projects(): FormArray {
    return this.addTaskArray.get('projects') as FormArray;
  }
  listOfTask(index): FormArray {
    return this.projects.at(index).get('listOfTask') as FormArray;
  }

  initializeTaskForm() {
    // let date = new Date();
    // let startDate = { date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } };
    // let endDate = { date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } };
    this.addTaskArray = this._fb.group({
      projects: this._fb.array([])
    });
  };

  onTaskEdit(projectTaskObj) {
    var project = [];
    for (let i = 0; i < projectTaskObj.length; i++) {
      const projects = projectTaskObj[i];
      var task = [];
      project.push({
        createdate: projects.createdate,
        descriptions: projects.descriptions,
        projectId: projects.projectId,
        projectName: projects.projectName,
        type: projects.type,
        listOfTask: task
      });
      for (let j = 0; j < projects.listOfTask.length; j++) {
        const tasks = projects.listOfTask[j];
        task.push({
          descriptions: tasks.descriptions,
          endDate: tasks.endDate,
          id: tasks.id,
          name: tasks.name,
          startDate: tasks.startDate,
          status: tasks.status,
        });
      }
    }
    this._tms.onTaskEdit(project);
  }

  //#endregion
  subscription: Subscription[] = [];

  constructor(private _cs: CommonService,
    private _tms: TaskManagementService,
    private _fb: FormBuilder) { }

  ngOnInit() {
    this.initializeTaskForm();
    this.onGetTaskList();
    this.subscription.push(this.addTaskArray.get('projects').valueChanges
      .subscribe(res => {
        if (res.length > 0) {
          this.onTaskEdit(res);
        }
      }));
  };

  ngOnDestroy() {
    this.subscription.forEach(x => x.unsubscribe());
  }
}
