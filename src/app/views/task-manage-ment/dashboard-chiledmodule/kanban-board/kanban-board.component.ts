import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskManagementService } from '../../task-management.service';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {

  //#region Properties
  lst_projects: any = [];
  searchProject: any;
  projectObj: any;
  //#endregion


  //#region Functions
  getAllProjects() {
    let res = this._tms.getProjectList();
    if (res.length > 0) {
      res.map(pro => {
        let task = this._tms.getTaskByProjectId(pro.id);
        var list_task: any = {};
        if (task) {
          list_task = this._tms.getTaskStatusWise(task.listOfTask);
        }
        pro.counter = list_task;
      });
    }
    this.lst_projects = res;
  };

  onProjectClick(projectObj) {
    this.projectObj = projectObj;
    this._router.navigate(['/taskManagement/dashboard/kanban'], { queryParams: { projectid: projectObj.id } });
  };

  onGanttChart(projectObj) {
    this.projectObj = projectObj;
    this._router.navigate(['/taskManagement/dashboard/gantt'], { queryParams: { projectid: projectObj.id } });
  };

  redirectToTask(pro) {
    this.router.navigate(['/taskManagement/task'], { queryParams: { projectId: pro.id } });
  };

  onProjectRedirect() {
    this.router.navigate(['/taskManagement/createproject']);
  };
  //#endregion

  constructor(private _tms: TaskManagementService,
    private router: Router,
    private _router: Router) { }

  ngOnInit() {
    this.getAllProjects();
  }

}
