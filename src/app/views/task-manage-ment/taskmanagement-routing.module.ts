import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProjectComponent } from './create-project/create-project.component';
import { AboutComponent } from './Common-Component/about/about.component';
import { TaskComponent } from './task/task.component';


const routes: Routes = [
  {
    path: '',
    data: { title: 'Project Management' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full', },
      {
        // path: 'dashboard', component: KanbanBoardComponent, data: { title: 'Dashboard' },
        path: 'dashboard',
        loadChildren: () => import('./dashboard-chiledmodule/dashboard.module').then(m => m.DashboardModule)
        // children: [
        //   { path: 'kanban', component: TaskNavigationComponent, data: { title: 'kanban' } },
        // ]
      },
      { path: 'createproject', component: CreateProjectComponent, data: { title: 'Create Project' } },
      { path: 'task', component: TaskComponent, data: { title: 'Task' } },
      { path: 'about', component: AboutComponent, data: { title: 'About Us' } },
    ]
  }
  // {
  //   path: '',
  //   data: { title: 'Project Management' },
  //   children: [
  //     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  //     { path: 'dashboard', component: KanbanBoardComponent, data: { title: 'Dashboard' } },
  //     { path: 'createproject', component: CreateProjectComponent, data: { title: 'Create Project' } },
  //     { path: 'task', component: TaskComponent, data: { title: 'Task' } },
  //     { path: 'about', component: AboutComponent, data: { title: 'About Us' } },
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskmanagementRoutingModule { }
