export interface IRequestOptions {
    action: string;
    relativeUrl: string
    method: number;
    body?: any;
    headers?: any;
    
    //custom options
    showLoader?: boolean;
    timeout?: number;
}