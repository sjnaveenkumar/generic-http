import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IResultOptions, IErrorOptions } from 'src/interfaces/api-callback-options';
import { ICallback } from 'src/interfaces/api-callback';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Actions } from 'src/enum/enums';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements ICallback {

  constructor(public api: ApiService) { }

  onSuccess(resultData: IResultOptions) {
    let body = resultData.body;
    switch (resultData.action) {
      case Actions.SINGLE_POST:
        // TODO: process single post response
        break;

      case Actions.ALL_POSTS:
        // TODO: process all posts response
        break
    }
  }
  onError(errorData: IErrorOptions) {
    let error = errorData.error;
    let status = errorData.status;
    switch (errorData.action) {
      case Actions.SINGLE_POST:
        //TODO: handle error for single post
        break;

      case Actions.ALL_POSTS:
        //TODO: handle error for all post
        break
    }
  }

  ngAfterViewInit() {

    this.api.request("getPost", { id: 1 }, this)
    this.api.request("getAllPost", null, this)
  }

  savePost() {
    this.api.request("setPost", {
      id: 107,
      title: "Naveen's Post",
      body: 'My Post bla bla bla',
      userId: 107
    })
  }

}
