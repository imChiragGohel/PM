import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { TaskManagementService } from '../task-management.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  //#region properties
  projectForm: FormGroup;
  lst_project: any = [];
  searchProject: any;
  confirmDialogOpen: any = false;
  dialogData: any = {
    title: '',
    message: '',
    data: '',
  };
  //#endregion

  //#region Functions

  fbSearchOrder() {
    let date = new Date();
    let createDate = { date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } };
    this.projectForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      type: [false],
      descriptions: ['', Validators.required],
      create_date: [createDate, Validators.required],
      isEdit: [false]
    });
  };

  saveProject() {
    for (let val in this.projectForm.controls) {
      this.projectForm.controls[val].markAsTouched();
    };
    if (this.projectForm.valid) {
      this._cs.displayLoader(true);
      let formValue = this.projectForm.getRawValue();
      let formate = this._tms.dateConverToString(formValue.create_date.date);
      if (formValue.id == 0) {
        let id = Math.floor(Math.random() * 1000);
        let body = {
          id: id,
          name: formValue.name,
          type: formValue.type ? this._cs.projectType.hourly : this._cs.projectType.fixed,
          descriptions: formValue.descriptions,
          createdate: formate
        };
        this._tms.addProject(body);
        this._cs.displayToastr('Project saved successfully', 'Save', this._cs.toaster_Obj.success);
      } else {
        let task = this._tms.getTaskByProjectId(formValue.id);
        let body = {
          id: formValue.id,
          name: formValue.name,
          type: formValue.type ? this._cs.projectType.hourly : this._cs.projectType.fixed,
          descriptions: formValue.descriptions,
          createdate: formate
        };
        this._tms.editProject(body);
        if (task && task.listOfTask) {
          let taskData = {
            projectId: body.id,
            projectName: body.name,
            type: body.type,
            descriptions: body.descriptions,
            createdate: body.createdate,
            listOfTask: task.listOfTask
          }
          this._tms.editProjectWithAlreadyTask(taskData);
        }
        this._cs.displayToastr('Project updated successfully', 'Update', this._cs.toaster_Obj.success);
      }
      this.resetForm();
      this._cs.displayLoader(false);
    }
  };

  resetForm = () => {
    let date = new Date();
    let createDate = { date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } };
    this.projectForm.reset();
    this.projectForm.patchValue({
      id: 0,
      create_date: createDate,
      isEdit: false
    });
  };


  onGetProjectList = () => {
    this._cs.displayLoader(true);
    let res = this._tms.getProjectList();
    this.lst_project = res;
    this._cs.displayLoader(false);
  };

  onEdit(project) {
    let date = new Date(project.createdate);
    let createDate = { date: { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } };
    this.projectForm.patchValue({
      id: project.id,
      name: project.name,
      type: project.type == this._cs.projectType.hourly ? true : false,
      descriptions: project.descriptions,
      create_date: createDate,
      isEdit: true
    });
  }

  dialogEvent(event) {
    if (event.flag) {
      this._tms.deleteProject(event.data.data);
      this.onGetProjectList();
      this.resetForm();
      this._cs.displayToastr('Project deleted successfully', 'Delete', this._cs.toaster_Obj.success);
    }
    this.confirmDialogOpen = false;
  }

  onDelete = (project) => {
    let task = this._tms.getTaskByProjectId(project.id);
    if (!task) {
      this.dialogData = {
        title: 'Delete',
        message: 'Are you sure , you want to remove this record ?',
        data: project
      };
      this.confirmDialogOpen = true;
    } else {
      this._cs.displayToastr('You can not delete this project, your option is to delete the tasks of project first and then try again.', 'Delete', this._cs.toaster_Obj.warning);
    }
  };

  onFormCancel = () => {
    this.resetForm();
  };
  //#endregion

  constructor(private fb: FormBuilder,
    public _tms: TaskManagementService,
    private _cs: CommonService) {
    this.fbSearchOrder();
  }

  ngOnInit() {
    this.onGetProjectList();
  }

}
