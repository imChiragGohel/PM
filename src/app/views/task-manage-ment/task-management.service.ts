import { Injectable } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { IMyDrpOptions } from 'mydaterangepicker';
import { MockService } from '../../services/mock.service';
import { CommonService } from '../../services/common.service';

@Injectable({
  providedIn: 'root'
})
export class TaskManagementService {

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy/mm/dd',
    openSelectorOnInputClick: true,
    editableDateField: false,
    showClearDateBtn: false
  };

  public myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'yyyy/mm/dd',
    width: '228px',
    editableDateRangeField: false,
    inline: false,
    openSelectorOnInputClick: true,
    showClearDateRangeBtn: false,
    showClearBtn: false,
    showApplyBtn: false
  };

  getProjectList() {
    return this._mc.lst_Project;
  };

  getTaskList() {
    return this._mc.lst_task;
  };

  getProjectById(projectId) {
    if (this._mc.lst_Project.length > 0) {
      let project = this._mc.lst_Project.find(x => x.id == projectId);
      return project;
    }
    return '';
  };

  getTaskByProjectId(projectId) {
    if (this._mc.lst_task.length > 0) {
      let task = this._mc.lst_task.find(x => x.projectId == projectId);
      return task;
    }
    return '';
  };

  getTaskStatusWise(taskList) {
    var active = [], inprocess = [], completed = [];
    if (taskList.length > 0) {
      taskList.map(x => {
        if (x.status == 1) {
          active.push(x);
        } else if (x.status == 2) {
          inprocess.push(x);
        } else if (x.status == 3) {
          completed.push(x);
        }
      });
    }
    var allList = { active: active, inprocess: inprocess, completed: completed };
    return allList;
  };

  getTaskIndexByProjectId(projectId) {
    if (this._mc.lst_task.length > 0) {
      let taskIndex = this._mc.lst_task.findIndex(x => x.projectId == projectId);
      return taskIndex;
    }
    return -1;
  };

  setTaskStatus(projectId, listOfTask) {
    let taskIndex = this._mc.lst_task.findIndex(x => x.projectId == projectId);
    if (taskIndex > -1) {
      this._mc.lst_task[taskIndex].listOfTask = listOfTask;
    };
    this._mc.setCookie('lst_task', JSON.stringify(this._mc.lst_task), 360);
  };

  addOneMoreTask(body, index) {
    if (this._mc.lst_task.length > 0) {
      this._mc.lst_task[index].listOfTask.push(body);
      this._mc.setCookie('lst_task', JSON.stringify(this._mc.lst_task), 360);
    }
  };

  addNewTaskObj(body) {
    if (this._mc.lst_task.length > 0) {
      this._mc.lst_task.push(body);
      this._mc.setCookie('lst_task', JSON.stringify(this._mc.lst_task), 360);
    } else {
      this._mc.lst_task = [];
      this._mc.lst_task.push(body);
      this._mc.setCookie('lst_task', JSON.stringify(this._mc.lst_task), 360);
    }
  };

  editTaskObj(taskObj, taskId, formValue) {
    let taskfilter = taskObj.listOfTask.findIndex(x => x.id == taskId);
    if (taskfilter > -1) {
      taskObj.listOfTask[taskfilter] = formValue;
      this._mc.setCookie('lst_task', JSON.stringify(this._mc.lst_task), 360);
    }
  };

  getTaskIndexByTaskId(projectIndex, taskId) {
    if (this._mc.lst_task.length > 0) {
      let taskIndex = this._mc.lst_task[projectIndex].listOfTask.findIndex(x => x.id == taskId);
      return taskIndex;
    };
    return -1;
  };

  onTaskDelete(projectIndex, taskIndex) {
    this._mc.lst_task[projectIndex].listOfTask.splice(taskIndex, 1);
    this._mc.setCookie('lst_task', JSON.stringify(this._mc.lst_task), 360);
    if (this._mc.lst_task[projectIndex].listOfTask.length <= 0) {
      this._mc.lst_task.splice(projectIndex, 1);
      this._mc.setCookie('lst_task', JSON.stringify(this._mc.lst_task), 360);
    };
  };

  onTaskEdit(taskList) {
    this._mc.lst_task = [];
    for (let i = 0; i < taskList.length; i++) {
      const element = taskList[i];
      this._mc.lst_task.push(element);
    }
    this._mc.setCookie('lst_task', JSON.stringify(this._mc.lst_task), 360);
  };

  addProject(project) {
    this._mc.lst_Project.push(project);
    this._mc.setCookie('lst_Project', JSON.stringify(this._mc.lst_Project), 360);
  };

  editProject(project) {
    let index = this._mc.lst_Project.findIndex(x => x.id == project.id);
    if (index > -1) {
      this._mc.lst_Project[index] = project;
    };
    this._mc.setCookie('lst_Project', JSON.stringify(this._mc.lst_Project), 360);
  };

  editProjectWithAlreadyTask(taskData) {
    let index = this._mc.lst_task.findIndex(x => x.projectId == taskData.projectId);
    if (index > -1) {
      this._mc.lst_task[index] = taskData;
    };
    this._mc.setCookie('lst_task', JSON.stringify(this._mc.lst_task), 360);
  };

  taskDeleteCommon(projectId, taskId) {
    var projectIndex = this.getTaskIndexByProjectId(projectId);
    var taskIndex = this.getTaskIndexByTaskId(projectIndex, taskId);
    if (projectIndex > -1 && taskIndex > -1) {
      this.onTaskDelete(projectIndex, taskIndex);
      this._cs.displayToastr('Task deleted successfully', 'Delete', this._cs.toaster_Obj.success);
    };
  }

  deleteProject(project) {
    this._mc.lst_Project = this._mc.lst_Project.filter(x => x.id != project.id);
    this._mc.setCookie('lst_Project', JSON.stringify(this._mc.lst_Project), 360);
  };

  dateConverToString(date) {
    return date.year + '/' + date.month + '/' + date.day;
  };

  constructor(private _mc: MockService,
    private _cs: CommonService) {
  }
}