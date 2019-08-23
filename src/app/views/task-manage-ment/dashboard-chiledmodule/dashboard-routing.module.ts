import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { TaskNavigationComponent } from './task-navigation/task-navigation.component';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Dashboard' },
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full', },
      { path: 'home', component: KanbanBoardComponent, data: { title: 'home' } },
      { path: 'kanban', component: TaskNavigationComponent, data: { title: 'Kanban' }, },
      { path: 'gantt', component: GanttChartComponent, data: { title: 'Gantt Chart' }, },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
