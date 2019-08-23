import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MyDatePickerModule } from 'mydatepicker';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ConfirmationDialogBoxComponent } from '../views/Common/confirmation-dialog-box/confirmation-dialog-box.component';
import { AddTaskComponent } from '../views/task-manage-ment/Common-Component/add-task/add-task.component';

@NgModule({
  declarations: [ConfirmationDialogBoxComponent, AddTaskComponent],
  imports: [
    CommonModule,
    TabsModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    NgxPaginationModule,
    MyDateRangePickerModule,
    ModalModule.forRoot(),
    Ng2SearchPipeModule,
    DragDropModule,
  ],
  exports: [
    CommonModule,
    TabsModule,
    AngularMultiSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MyDatePickerModule,
    MyDateRangePickerModule,
    NgxPaginationModule,
    ModalModule,
    Ng2SearchPipeModule,
    DragDropModule,
    ConfirmationDialogBoxComponent, //Common Component
    AddTaskComponent
  ],
})
export class SharedModule { }
