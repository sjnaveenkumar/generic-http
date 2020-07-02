export interface IApiSuccessResponseOptions {
    action: string;
    status: number;
    body: any
}

export interface IApiErrorResponseOptions {
    action: string;
    status: number;
    error: any
}