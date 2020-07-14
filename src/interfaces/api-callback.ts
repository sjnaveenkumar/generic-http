import { IResultOptions, IErrorOptions } from './api-callback-options';


export interface ICallback {
    onSuccess(resultData: IResultOptions);
    onError(errorData: IErrorOptions);
}