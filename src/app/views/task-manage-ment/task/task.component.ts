import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { TaskManagementService } from '../task-management.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  //#region Properties
  searchProject: any;
  lst_task: any = [];
  lst_project: any = [];
  editData: any;
  addTaskComponent: any = false;
  addTaskArray: FormGroup;
  projectId: any = 0;
  taskEdit: any;
  confirmDialogOpen: any = false;
  dialogData: any = {
    title: '',
    message: '',
    data: '',
  };
  //#endregion

  //#region Functions
  onGetTaskList = () => {
    // this.addTaskArray.patchValue(this.projects,)
    this.addTaskArray.reset({}, { emitEvent: false });
    this.projects.clear();
    this._cs.displayLoader(true);
    this.taskLoad();
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

  onChangeProject(event) {
    this.projectId = event.target.value;
    this.onGetTaskList();
  };

  taskLoad() {
    if (this.projectId != 0) {
      this.lst_task = [];
      let lst_task = this._tms.getTaskByProjectId(this.projectId);
      if (lst_task) {
        this.lst_task.push(lst_task)
      }
    } else {
      let res = this._tms.getTaskList();
      this.lst_task = res;
    }
  }

  onAddTask() {
    this.taskEdit = null;
    this.addTaskComponent = true;
  };

  onModalClose(event) {
    if (event) {
      this._cs.displayLoader(true);
      this.addTaskComponent = event.isModalClose;
      this._cs.displayLoader(false);
      this.onGetTaskList();
    }
  };

  dialogEvent(event) {
    if (event.flag) {
      this._tms.taskDeleteCommon(event.data.data.taskWithProject.projectId, event.data.data.Task.id);
      this.onGetTaskList();
    }
    this.confirmDialogOpen = false;
  }

  onDeleteTask(taskWithProject, Task) {
    this.dialogData = {
      title: 'Delete',
      message: 'Are you sure , you want to remove this record ?',
      data: { taskWithProject: taskWithProject, Task: Task }
    };
    this.confirmDialogOpen = true;
    // if (confirm('Are you sure , you want to remove this record ?')) {
    //   this._tms.taskDeleteCommon(taskWithProject.projectId, Task.id);
    //   this.onGetTaskList();
    // }
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

  onClickEditTask(project, task) {
    this.taskEdit = {
      project: project,
      task: task,
      isEdit: true
    };
    this.addTaskComponent = true;
  }

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

  ifProjectIdGet() {
    this._route.queryParams.
      subscribe(res => {
        if (res && res.projectId) {
          this.projectId = res.projectId;
        }
        this.initializeTaskForm();
        this.onGetTaskList();
        this.lst_project = this._tms.getProjectList();
      });
  }

  //#endregion
  subscription: Subscription[] = [];

  constructor(private _cs: CommonService,
    private _tms: TaskManagementService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.ifProjectIdGet();
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