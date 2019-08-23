import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskManagementService } from '../../task-management.service';
import { CommonService } from '../../../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-navigation',
  templateUrl: './task-navigation.component.html',
  styleUrls: ['./task-navigation.component.scss']
})
export class TaskNavigationComponent implements OnInit {

  //#region Properties
  projectObj: any;
  lst_active: any = [];
  lst_inprocess: any = [];
  lst_completed: any = [];
  listOfTask: any = [];
  isTask: any = false;
  taskEdit: any;
  title: any = 'Click to edit task.';
  //#endregion


  //#region Functions
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.arrayStatusChange();
    }
  }

  arrayStatusChange() {
    if (this.lst_active.length > 0) {
      this.lst_active.map(x => {
        x.status = 1
      });
    }
    if (this.lst_inprocess.length > 0) {
      this.lst_inprocess.map(x => {
        x.status = 2
      });
    }
    if (this.lst_completed.length > 0) {
      this.lst_completed.map(x => {
        x.status = 3
      });
    }
    this.meargeArray();
    this.setAllData();
  };

  meargeArray() {
    this.listOfTask = [].concat(this.lst_active, this.lst_inprocess, this.lst_completed);
  };

  setAllData() {
    this._tms.setTaskStatus(this.projectObj.id, this.listOfTask);
  };

  onListclick(listObject) {
    let project = this._tms.getProjectById(this.projectObj.id);
    this.taskEdit = {
      project: project,
      task: listObject,
      isEdit: true
    };
    this.isTask = true;
  }

  onAddTask() {
    this.isTask = true;
  }

  onModalClose(event) {
    if (event) {
      this._cs.displayLoader(true);
      this.isTask = event.isModalClose;
      this.taskEdit = null;
      this._cs.displayLoader(false);
      this.loadTasks();
    }
  };

  loadTasks() {
    let task = this._tms.getTaskByProjectId(this.projectObj.id)
    if (task) {
      var list_task = this._tms.getTaskStatusWise(task.listOfTask);
      if (list_task) {
        this.lst_active = list_task.active;
        this.lst_inprocess = list_task.inprocess;
        this.lst_completed = list_task.completed;
      };
      this.meargeArray();
    } else {
      this.lst_active = [];
      this.lst_inprocess = [];
      this.lst_completed = [];
    };
  }
  //#endregion

  constructor(private _cs: CommonService,
    private _tms: TaskManagementService,
    private _route: ActivatedRoute,
    private _router: Router) {
  }

  ngOnInit() {
    this._route.queryParams.subscribe(res => {
      if (res && res.projectid) {
        let projectObj = this._tms.getProjectById(res.projectid);
        if (projectObj) {
          this.projectObj = projectObj;
          this.loadTasks();
        } else {
          this._router.navigate(['/']);
        }
      } else {
        this._router.navigate(['/']);
      }
    })
  }
}
