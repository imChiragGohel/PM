import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TaskManagementService } from '../../task-management.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  //#region Properties
  @Output() modalClose = new EventEmitter();
  @ViewChild('addTaskModel', { static: false }) addTaskModel: ModalDirective;
  addTask: FormGroup;
  lst_project: any = [];
  editingTask: any;
  _projectId: any;

  @Input('projectId') set projectId(value) {
    this._projectId = value;
    if (this._projectId || this._projectId == 0) {
      this.addTask.patchValue({
        projectId: this._projectId != 0 ? this._projectId : ''
      });
    }
  };

  @Input('editTask') set editTask(value) {
    if (value) {
      this.editTaskValuePatch(value);
    } else {
      this.editingTask = null;
    }
  }
  //#endregion

  //#region Functions
  editTaskValuePatch(value) {
    this.editingTask = value;
    let sdate = new Date(this.editingTask.task.startDate);
    let edate = new Date(this.editingTask.task.endDate);
    let start_enddate = {
      beginDate: { year: sdate.getFullYear(), month: sdate.getMonth() + 1, day: sdate.getDate() },
      endDate: { year: edate.getFullYear(), month: edate.getMonth() + 1, day: edate.getDate() }
    };
    this.addTask.patchValue({
      id: this.editingTask.task.id,
      name: this.editingTask.task.name,
      projectId: this.editingTask.project.projectId ? this.editingTask.project.projectId : this.editingTask.project.id ? this.editingTask.project.id : '',
      description: this.editingTask.task.descriptions,
      status: this.editingTask.task.status,
      start_end_date: start_enddate
    });
    this.addTask.controls['projectId'].disable();
  };

  onModalClose() {
    this.resetModal();
    this.modalClose.emit({ isModalClose: false });
  };

  initializeTaskForm() {
    let date = new Date();
    let start_enddate = {
      beginDate: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() },
      endDate: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() }
    };
    this.addTask = this._fb.group({
      id: [0],
      name: ['', Validators.required],
      projectId: ['', Validators.required],
      description: ['', Validators.required],
      start_end_date: [start_enddate, Validators.required],
      status: [1, Validators.required]
    });
  };

  onGetProjectList = () => {
    this._cs.displayLoader(true);
    let res = this._tms.getProjectList();
    this.lst_project = res;
    this._cs.displayLoader(false);
  };

  onTaskSave() {
    for (let val in this.addTask.controls) {
      this.addTask.controls[val].markAsTouched();
    };
    if (this.addTask.valid) {
      var formValue = this.addTask.getRawValue();
      let projectObj = this._tms.getProjectById(formValue.projectId);
      let taskObj = this._tms.getTaskByProjectId(formValue.projectId);
      let taskIndex = this._tms.getTaskIndexByProjectId(formValue.projectId);
      let startdate = this._tms.dateConverToString(formValue.start_end_date.beginDate);
      let enddate = this._tms.dateConverToString(formValue.start_end_date.endDate);
      if (formValue.id == 0) {
        let id = Math.floor(Math.random() * 1000);
        if (taskObj && taskIndex > -1) {
          let body = {
            id: id,
            name: formValue.name,
            descriptions: formValue.description,
            status: formValue.status,
            startDate: startdate,
            endDate: enddate,
          };
          this._tms.addOneMoreTask(body, taskIndex);
        } else {
          let body = {
            projectId: projectObj.id,
            projectName: projectObj.name,
            type: projectObj.type,
            descriptions: projectObj.descriptions,
            createdate: projectObj.createdate,
            listOfTask: [{
              id: id,
              name: formValue.name,
              descriptions: formValue.description,
              status: formValue.status,
              startDate: startdate,
              endDate: enddate
            }]
          };
          this._tms.addNewTaskObj(body);
        }
        this._cs.displayToastr('Task saved successfully', 'Save', this._cs.toaster_Obj.success);
      } else {
        let task = {
          id: formValue.id,
          name: formValue.name,
          status: formValue.status,
          descriptions: formValue.description,
          startDate: startdate,
          endDate: enddate
        }
        this._tms.editTaskObj(taskObj, formValue.id, task);
        this._cs.displayToastr('Task update successfully', 'Update', this._cs.toaster_Obj.success);
      }
      this.onModalClose();
    };
  };

  resetModal() {
    this.addTask.reset();
    this.initializeTaskForm();
  }
  //#endregion
  constructor(public _tms: TaskManagementService,
    private _cs: CommonService,
    private _fb: FormBuilder) { this.initializeTaskForm(); }

  ngOnInit() {
    setTimeout(() => {
      this.addTaskModel.show();
      this.onGetProjectList();
    }, 200);
  }
}
