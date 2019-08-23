import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    // data: {
    //   title: 'Home'
    // },
    children: [
      { path: '', redirectTo: 'taskManagement', pathMatch: 'full' },
      {
        path: 'taskManagement',
        loadChildren: () => import('./views/task-manage-ment/task-manage-ment.module').then(m => m.TaskManageMentModule)
      }
    ]
  },
  { path: '**', redirectTo: 'taskManagement' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
