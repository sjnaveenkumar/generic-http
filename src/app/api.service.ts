import { Injectable } from '@angular/core';
import { SampleModel } from '../models/sample-model';
import { IApiRequestOptions } from '../interfaces/api-request-options';

import { IApiCallback } from '../interfaces/api-callback';
import { HttpClient } from '@angular/common/http';

export enum Actions {
  SAMPLE = "sample", SAMPLE2 = "s"
}

export enum Method {
  GET, POST, PUT, DELETE
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = "https://sjnaveenkumar.github.io"
  private callBackListener: IApiCallback;
  private requestOptions: IApiRequestOptions
  constructor(private http: HttpClient) {

  }
  sample = new SampleModel()

  request(requestOptions: IApiRequestOptions, listener: IApiCallback) {
    this.requestOptions = requestOptions;
    this.callBackListener = listener;
    switch (requestOptions.method) {
      case Method.POST:

        break
      case Method.GET:
        this.http.get(`${this.baseUrl}/${requestOptions.relativeUrl}`)
          .subscribe((response: any) => {
            this.handleResponse(response)
          }, (error: any) => {
            this.handleError(error)
          });
        break
    }
  }

  private async handleResponse(response: any) {
    if (Array.isArray(response)) {
      this[this.requestOptions.action]["dataArray"] = response;
    } else {
      if (this[this.requestOptions.action]) {
        for (var serializableObject in this[this.requestOptions.action]) {
          for (var objectResponse in response) {
            if (serializableObject == objectResponse) {
              this[this.requestOptions.action][serializableObject] = response[objectResponse]
            }
          }
        }
      }
      this.callBackListener.onSuccess({
        action: this.requestOptions.action,
        status: 200,
        body: response
      })
    }
  }

  private handleError(error: any) {
    this.callBackListener.onError({
      action: this.requestOptions.action,
      error: error.message,
      status: error.status
    })
  }



}
