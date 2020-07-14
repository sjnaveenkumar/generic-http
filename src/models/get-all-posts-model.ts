import { IAllPosts, IPosts } from "../serializers/get-all-posts";

export class AllPostsModel implements IAllPosts, IPosts {
    
    // implemented from IAllPosts
    dataArray: IPosts[] = [];

    // implemented from IPosts
    userId: number = -1;
    id: number = -1;
    title: string = "Loading";
    body: string = "Loading";

}