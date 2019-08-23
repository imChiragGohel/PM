import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  lst_Project: any = [] = [
    {
      id: 256,
      name: 'Project 1',
      type: 'Hourly',
      descriptions: 'Project 1 descriptions',
      createdate: '2019/7/20'
    },
    {
      id: 258,
      name: 'Project 2',
      type: 'Fixed Price',
      descriptions: 'Project 2 descriptions',
      createdate: '2019/6/25'
    },
    {
      id: 259,
      name: 'Project 3',
      type: 'Fixed Price',
      descriptions: 'Project 3 descriptions',
      createdate: '2019/6/26'
    },
    {
      id: 260,
      name: 'Project 4',
      type: 'Hourly',
      descriptions: 'Project 4 descriptions',
      createdate: '2019/6/26'
    }
  ];

  lst_task: any = [] = [
    {
      projectId: 256,
      projectName: 'Project 1',
      type: 'Hourly',
      descriptions: 'Project 1 Sight Project',
      createdate: '2019/7/20',
      listOfTask: [
        {
          id: 365,
          name: 'create data base',
          descriptions: 'On Mysql and make entity',
          status: 1,//Pending
          startDate: '2019/7/20',
          endDate: '2019/8/02',
        },
        {
          id: 366,
          name: 'make proper alignment',
          descriptions: 'dashboard and home page',
          status: 2,//Inprocess
          startDate: '2019/7/25',
          endDate: '2019/8/30',
        },
        {
          id: 367,
          name: 'bug on user page',
          descriptions: 'user does not exist  but its already there',
          status: 3,//Completed
          startDate: '2019/9/01',
          endDate: '2019/9/10',
        },
        {
          id: 368,
          name: 'change color',
          descriptions: 'button color proper',
          status: 1,//Pending
          startDate: '2019/9/12',
          endDate: '2019/9/18',
        },
      ]
    },
    {
      projectId: 258,
      projectName: 'Project 2',
      type: 'Fixed Price',
      descriptions: 'Project 2 Accounting Soft',
      createdate: '2019/6/25',
      listOfTask: [
        {
          id: 369,
          name: 'make architecture',
          descriptions: 'user authentication and authorizations',
          status: 1,//Pending
          startDate: '2019/9/20',
          endDate: '2019/9/23',
        },
        {
          id: 370,
          name: 'make api',
          descriptions: 'registration and forgot password',
          status: 1,//Inprocess
          startDate: '2019/9/25',
          endDate: '2019/10/01',
        }
      ]
    }
  ];

  /**
   * SetCookie Method (Locally Value set)
   * @param cname - CookieName Like 'Lst_Projects'
   * @param cvalue - CookieValue Like 'abc'
   * @param exdays - CookieExpireDays Like 360
   */
  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  /**
   * GetCookie Method (Value get)
   * @param cname - CookieName Like Lst_Projects
   */
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  constructor() {
    if (!this.getCookie('lst_Project')) {
      this.setCookie('lst_Project', JSON.stringify(this.lst_Project), 360);
    } else {
      if (this.getCookie('lst_Project') != '0') {
        let lst_project = this.getCookie('lst_Project');
        if (lst_project) {
          this.lst_Project = JSON.parse(lst_project);
        }
      } else {
        this.setCookie('lst_Project', JSON.stringify(this.lst_Project), 360);
      }
    }

    if (!this.getCookie('lst_task')) {
      this.setCookie('lst_task', JSON.stringify(this.lst_task), 360);
    } else {
      if (this.getCookie('lst_task') != '0') {
        let lst_task = this.getCookie('lst_task');
        if (lst_task) {
          this.lst_task = [];
          this.lst_task = JSON.parse(lst_task);
        }
      } else {
        this.setCookie('lst_task', JSON.stringify(this.lst_task), 360);
      }
    }
  }
}
