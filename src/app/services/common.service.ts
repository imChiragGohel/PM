import { Injectable } from '@angular/core';
import { Observable, throwError, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

//const internetMessage = 'Please check your internet connection !!';
const baseUrl = environment.apiURL;
const token = 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1NjE0NTQxNDUsImV4cCI6MTg3NjgxNDE0NSwiaXNzIjoiaHR0cDovL25vcC5zYXR2YS5zb2x1dGlvbnMiLCJhdWQiOlsiaHR0cDovL25vcC5zYXR2YS5zb2x1dGlvbnMvcmVzb3VyY2VzIiwibm9wX2FwaSJdLCJjbGllbnRfaWQiOiJhNTBkY2I0MS1lODgzLTQ5YWItOGM3NS02ZTU5MzI1MTIzNTciLCJzdWIiOiJhNTBkY2I0MS1lODgzLTQ5YWItOGM3NS02ZTU5MzI1MTIzNTcgIiwiYXV0aF90aW1lIjoxNTYxNDUzOTI0LCJpZHAiOiJsb2NhbCIsInNjb3BlIjpbIm5vcF9hcGkiLCJvZmZsaW5lX2FjY2VzcyJdLCJhbXIiOlsicHdkIl19.m0z531w-lClGHBgLo82xMeUHRny17jM0QMr3eDs4nZWB48EVTFhPFzve786FsxdsxiPqE5rytsMQWXA7ByXe9N4cZFNnl7wpE1dCjOvS02c8H0AfNVdMkiJOGILRmbpHRKuWj8O0IjhWlwdll8-7nhRCJ7x6GBqx1Aj6RdceUKuma0qRFuqIcCBOuoKovPRHQ5AQ6yPZd-DIZE0Wu5KmChnwCfwIjs3CmJsepClOCF16T5UcsEKZq8409GXw2I070MKVbRBNQBvNCjf6OOtLFhCXUCExZXx4BJSohHcX4bP-qyBhQI-ZPcCxIIhKikHsZJkVyklzAQ19cUtrnnrxzQ';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  toaster_Obj: any = {
    success: 0,
    error: 1,
    warning: 2,
  };

  projectType: any = {
    fixed: 'Fixed Price',
    hourly: 'Hourly',
  };

  // #region API METHODS

  /** Get API Method.
   * @param url - Just pass url after /api/. Predefine url will take from environment   
  */
  API_GET(url: string): Observable<any> {
    let hd: HttpHeaders = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/json',
    });
    return this._httpClient.get(baseUrl + `${url}`, { headers: hd }).pipe(map(res => {
      return res;
    }, catchError(err => {
      if (err.status == 401) {
      }
      else if (err.status == 400) {
      }
      return throwError(err);
    })));
  };
  // #endregion

  //#region  Display Loader and Toaster

  /**
   * Display toaster when data in some changes
   * @param message Recored Save Succressfull!
   * @param title Save
   * @param flag 0 = success, 1 = error,2 = warning
   */
  displayToastr(message, title, flag) {
    if (flag == 0) {
      this.toastrService.success(message, title);
    } else if (flag == 1) {
      this.toastrService.error(message, title);
    } else if (flag == 2) {
      this.toastrService.warning(message, title);
    }
  };

  /**
   * Display loader when some data loaded
   * @param value Boolean value pass true either false
   */
  displayLoader(value) {
    value ? this.spinner.show() : this.spinner.hide();
  };

  //#endregion


  constructor(public _router: Router,
    public _httpClient: HttpClient,
    private toastrService: ToastrService,
    private spinner: NgxSpinnerService) { }
}
