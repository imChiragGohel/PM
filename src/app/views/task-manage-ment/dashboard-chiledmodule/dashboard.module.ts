import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { TaskManagementService } from '../task-management.service';
import { SharedModule } from '../../../shared/shared.module';
import { TaskNavigationComponent } from './task-navigation/task-navigation.component';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';



@NgModule({
  declarations: [
    KanbanBoardComponent,
    GanttChartComponent,
    TaskNavigationComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  providers: [TaskManagementService]
})
export class DashboardModule { }
