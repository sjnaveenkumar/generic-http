import { Component } from '@angular/core';
import { ApiService, Method, Actions } from './api.service';
import { IApiCallback } from '../interfaces/api-callback';
import { IApiSuccessResponseOptions, IApiErrorResponseOptions } from '../interfaces/api-response-options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements IApiCallback {
  title = 'generic-http';
  sample: String = "Naveen"
  constructor(public api: ApiService) {

  }
  onSuccess(options: IApiSuccessResponseOptions) {
    console.log("Sucess:", options)
  }
  onError(options: IApiErrorResponseOptions) {
    console.log("Error:", options)
  }

  ngAfterViewInit() {
    
    this.api.request({
      action: Actions.SAMPLE,
      method: Method.GET,
      relativeUrl: "db.json",
    }, this)
  }
}
