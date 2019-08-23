import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-dialog-box',
  templateUrl: './confirmation-dialog-box.component.html',
  styleUrls: ['./confirmation-dialog-box.component.scss']
})
export class ConfirmationDialogBoxComponent implements OnInit {

  //#region Variables
  @ViewChild('dialogBox', { static: false }) dialogBox: ModalDirective;
  @Input() dialogData: any;
  @Output() onDialog = new EventEmitter();
  content: any;
  //#endregion

  //#region Functions
  onDialogClose() {
    this.content = {
      data: this.dialogData,
      flag: false
    }
    this.onDialog.emit(this.content);
  }

  onDialogYes() {
    this.content = {
      data: this.dialogData,
      flag: true
    }
    this.onDialog.emit(this.content);
  }
  //#endregion
  constructor() { }

  ngAfterViewInit() {
    this.dialogBox.show();
  }

  ngOnInit() {
  }

}
