import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment';
import { CommonService } from './services/common.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: `<router-outlet>
  <ngx-spinner
  bdColor="rgba(51,51,51,0.8)"
  size="large"
  color="#fff"
  type="ball-scale-multiple"
></ngx-spinner>
  </router-outlet>
  `
})
export class AppComponent implements OnInit, OnDestroy {

  public isSpinnerVisible = true;
  constructor(
    private router: Router,
    private _cs: CommonService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this._cs.displayLoader(true);
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this._cs.displayLoader(true);
          //this.isSpinnerVisible = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this._cs.displayLoader(false);
          //this.isSpinnerVisible = false;
        }
      },
      () => {
        this._cs.displayLoader(false);
        //this.isSpinnerVisible = false;
      }
    );
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
    if (environment.production) {
      if (location.protocol === 'http:') {
        window.location.href = location.href.replace('http', 'https');
      }
    }
  }

  ngOnDestroy() {
    this._cs.displayLoader(false);
  }
}
