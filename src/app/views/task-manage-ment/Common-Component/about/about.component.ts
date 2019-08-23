import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  //#region Variables
  confirmDialogOpen: any = false;
  dialogData: any = {
    title: '',
    message: '',
    data: '',
  };
  //#endregion


  //#region Functions
  dialogEvent(event) {
    if (event.flag) {
      localStorage.clear();
      document.cookie = "lst_Project=0";
      document.cookie = "lst_task=0";
      location.reload(true);
    }
    this.confirmDialogOpen = false;
  }

  resetData() {
    this.dialogData = {
      title: 'Reset Data',
      message: '<b>Are you sure ?</b> <br/> You want to reset application. <br/> If <b>Yes</b> then you get default data.',
      data: ""
    };
    this.confirmDialogOpen = true;
  };
  //#endregion

  constructor() { }

  ngOnInit() {
  }

}
