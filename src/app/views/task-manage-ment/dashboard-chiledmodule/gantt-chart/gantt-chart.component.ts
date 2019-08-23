import { Component, OnInit, ElementRef, ViewChild, } from '@angular/core';
import "dhtmlx-gantt";
import { TaskManagementService } from '../../task-management.service';
import { CommonService } from '../../../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  //encapsulation: ViewEncapsulation.None,
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements OnInit {
  @ViewChild("gantt_here", { static: true }) ganttContainer: ElementRef;

  //#region Properties
  isEditTask: any = false;
  taskEdit: any;
  isEventAttached: boolean = false;
  projectObj: any;
  lst_tsk: any = [];
  Link: any = [{ id: 1, source: 1, target: 2, type: "0" }]
  //#endregion

  //#region Functions
  onModalClose(event) {
    if (event) {
      this._cs.displayLoader(true);
      this.isEditTask = event.isModalClose;
      this.taskEdit = null;
      this.taskProgress();
      this._cs.displayLoader(false);
    }
  };

  dateDurations(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  onAddTask() {
    this.isEditTask = true;
  }

  editTaskModalOpen(taskId) {
    this._cs.displayLoader(true);
    var task;
    let project = this._tms.getTaskByProjectId(this.projectObj.id);
    if (project && project.listOfTask.length > 0) {
      task = project.listOfTask.find(x => x.id == taskId);
    }
    if (project && task) {
      this.taskEdit = {
        project: project,
        task: task,
        isEdit: true
      };
      this.isEditTask = true;
    }
    this._cs.displayLoader(false);
  }

  onDeleteTask(taskId) {
    this._tms.taskDeleteCommon(this.projectObj.id, taskId);
    this.taskProgress();
  };

  taskLoadOnChart(task) {
    for (let i = 0; i < task.length; i++) {
      const element = task[i];
      var dateDurations = this.dateDurations(element.startDate, element.endDate)
      var body = {
        id: element.id,
        text: element.name,
        start_date: element.startDate,
        duration: dateDurations + 1,
        color: element.status == 1 ? '#20a8d8' : element.status == 2 ? '#ffc107' : '#4dbd74'
        //progress: 0.6,
      }
      this.lst_tsk.push(body);
    }
  }

  taskProgress() {
    var event;
    const self = this;
    this.lst_tsk = [];
    if (this.projectObj) {
      let project = this._tms.getTaskByProjectId(this.projectObj.id);
      if (project && project.listOfTask.length > 0) {
        this.taskLoadOnChart(project.listOfTask);
      } else {
        this.lst_tsk = [];
      }
    } else {
      this.lst_tsk = [];
    }

    gantt.config.xml_date = "%Y-%m-%d %H:%i";
    gantt.config.readonly = true;
    gantt.config.columns = [
      { name: "text", label: "Task name", width: "*" },
      { name: "start_date", label: "Start time", align: "center" },
      { name: "duration", label: "Duration", align: "center" },
      // {name:"add",        label:"",           width:44 }
      {
        name: "buttons", label: "Action", width: 44, template: function (task) {
          return (
            '<button class="btn btn-outline-success btn-sm right-margin" data-action="edit"><i class="fa fa-pencil"></i></button>'
            // + '<button class="btn btn-outline-danger btn-sm" data-action="delete"><i class="fa fa-trash"></i></button>'
          );
        }
      }
    ];
    gantt.detachEvent(event);
    if (this.isEventAttached == false) {
      this.isEventAttached = true;
      event = gantt.attachEvent("onTaskClick", function (id, e, task) {
        var button = e.target.closest("[data-action]")
        if (button) {
          var action = button.getAttribute("data-action");
          switch (action) {
            case "edit":
              self.editTaskModalOpen(id);
              break;
            case "delete":
              if (window.confirm('Are you sure , you want to remove this record ?')) {
                self.onDeleteTask(id);
              }
              break;
          }
          return false;
        }
        return true;
      });
    }

    gantt.init(this.ganttContainer.nativeElement);
    gantt.clearAll();

    Promise.all([this.lst_tsk, this.Link])
      .then(([data, links]) => {
        gantt.parse({ data, links });
      });
  }
  //#endregion

  constructor(private _cs: CommonService,
    private _tms: TaskManagementService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this._route.queryParams.subscribe(res => {
      if (res && res.projectid) {
        let projectObj = this._tms.getProjectById(res.projectid);
        if (projectObj) {
          this.projectObj = projectObj;
          this.taskProgress();
        } else {
          this._router.navigate(['/']);
        }
      } else {
        this._router.navigate(['/']);
      }
    })
  }
}
