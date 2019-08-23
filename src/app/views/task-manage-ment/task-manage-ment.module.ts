import { NgModule } from '@angular/core';
import { CreateProjectComponent } from './create-project/create-project.component';
import { TaskmanagementRoutingModule } from './taskmanagement-routing.module';
import { TaskManagementService } from './task-management.service';
import { SharedModule } from '../../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AboutComponent } from './Common-Component/about/about.component';
import { TaskComponent } from './task/task.component';
import { TaskOldComponent } from './task-old/task-old.component';

@NgModule({
  declarations: [
    CreateProjectComponent,
    TaskComponent,
    AboutComponent,
    TaskOldComponent
  ],
  imports: [
    SharedModule,
    TaskmanagementRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [TaskManagementService]
})
export class TaskManageMentModule { }
