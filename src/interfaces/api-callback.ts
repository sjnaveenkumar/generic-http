import { IApiSuccessResponseOptions, IApiErrorResponseOptions } from "./api-response-options";

export interface IApiCallback {
    onSuccess(options: IApiSuccessResponseOptions);
    onError(options: IApiErrorResponseOptions);
}