import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ICallback } from 'src/interfaces/api-callback';
import { IRequestOptions } from 'src/interfaces/api-request-options'
import { IResultOptions, IErrorOptions } from 'src/interfaces/api-callback-options';
import { ServiceHolder } from 'src/app/service-holder'
import { Method } from "src/enum/enums"
import { timeout } from 'rxjs/operators'
import { AllPostsModel } from '../models/get-all-posts-model'
import { SinglePostModel } from '../models/get-single-post-model'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
/**
 * ApiService - Core Service for calling HTTP Requests. 
 */
export class ApiService extends ServiceHolder {

  // declaring the base URL
  private baseUrl: string = "https://jsonplaceholder.typicode.com"

  // declaring the data model variable and initialising it. 
  all_posts = new AllPostsModel();
  single_post = new SinglePostModel();
  set_post = new SinglePostModel();

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * returns HttpHeaders if the request header is available.
   * @param headers request headers
   */
  private getHeaders(headers: any): HttpHeaders {
    if (headers) return new HttpHeaders(headers)
    return new HttpHeaders()
  }

  /**
   * Let us make the HTTP call by sending these parameters from Components.  
   * @param method takes the method name declared in ServiceHolder
   * @param body takes the body input
   * @param callback callback for sending success/error from HTTP request. 
   */
  request(method: string, body?: any, callback?: ICallback) {

    // Extracting the options from the method declared in ServiceHolder
    let options = this[method](body);

    // Show Loader in the UI based on the showLoader option. 
    if (options.showLoader) { }
    switch (options.method) {
      case Method.POST:
        // Performing Http Post request
        this.http.post(`${this.baseUrl}/${options.relativeUrl}`, options.body, {
          headers: this.getHeaders(options.headers)
        }).pipe(timeout(options.timeout | 30000)).subscribe((response: any) => {
          // Raw JSON response is sent to the handleResponse to process the data. 
          this.handleResponse(options.action, response, callback)
        }, (error: any) => {
          // Error is sent to the handleError.  
          this.handleError(options.action, error, callback)
        })
        break

      case Method.GET:
        // Performing Http Get request
        this.http.get(`${this.baseUrl}/${options.relativeUrl}`, { headers: this.getHeaders(options.headers) })
          .pipe(timeout(options.timeout | 30000))
          .subscribe((response: any) => {
            // Raw JSON response is sent to the handleResponse to process the data. 
            this.handleResponse(options.action, response, callback)
          }, (error: any) => {
            // Error is sent to the handleError.  
            this.handleError(options.action, error, callback)
          });
        break
    }
  }

  /**
   * Map the JSON response from the request function to data model class.
   * @param action request's action value 
   * @param response JSON response from request funciton
   */
  private mapper(action: string, response: any) {
    // returning the function if no data model variable is declared for the action. 
    if (!this[action]) return;

    // checking if the response is JSONArray
    if (Array.isArray(response)) {
      this[action]["dataArray"] = response;
    } else {
      // if the response is not array
      //looping into the data model
      for (var serializableObject in this[action]) {
        // looping into the response from HTTP request. 
        for (var objectResponse in response) {
          // checking if the key from the JSON response matches the Object in the data model.
          if (serializableObject == objectResponse) {
            // if matches, assigning the JSON value to the object in the data model. 
            this[action][serializableObject] = response[objectResponse]
          }
        }
      }
    }
  }

  /**
   * Handles the response, calls the mapper and send the callback
   * @param action request's action passed from request function
   * @param response response passed from  request function
   * @param callback callback passed from request function
   */
  private handleResponse(action: string, response: any, callback: ICallback) {
    //TODO: dismiss loader
    //Mapping response to the data model
    this.mapper(action, response)
    //Sending success callback
    if (callback) {
      let resultData: IResultOptions = {
        action: action,
        body: response
      }
      callback.onSuccess(resultData)
    }
  }

  /**
   * Handles the error, prints log, handles http errors, send analytics for errors and send the callback
   * @param action request's action passed from request function
   * @param error error passed from request function
   * @param callback callback passed from request function
   */
  private handleError(action: string, error: HttpErrorResponse, callback: ICallback) {
    // TODO: dismiss loader.
    //Printing logs as table format
    console.table([{ action: action, status: error.status, message: error.message }])
    //Handling custom http errors
    switch (error.status) {
      case 404:
        alert("OOPS, Request Not Found! :( ")
        break;
      case 401:
        // TODO: Unauthorized request, perform login call again.
        break;
    }
    //TODO: Send analytics event for failures here.
    //Sending error callback
    if (callback) {
      let errorData: IErrorOptions = {
        action: action,
        error: error.message,
        status: error.status
      };
      callback.onError(errorData)
    }
  }
}
