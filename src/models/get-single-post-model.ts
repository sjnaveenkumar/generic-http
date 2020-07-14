import { IPost } from "../serializers/get-single-post";

export class SinglePostModel implements IPost {

    // Implemented from IPost
    userId: number = -1;
    id: number = -1;
    title: string = "Loading";
    body: string = "Loading";

    getDetails() {
        return "Title: " + this.title + "<br>" + "Body: " + this.body + "<br>" + "User ID: " + this.userId + "<br>"
    }

}