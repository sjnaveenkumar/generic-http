export interface IAllPosts {
    dataArray: IPosts[] // add this variable, if the response is JSONArray
}
export interface IPosts {
    userId: number;
    id: number;
    title: string;
    body: string;
}