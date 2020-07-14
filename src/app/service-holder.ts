import { IRequestOptions } from 'src/interfaces/api-request-options';
import { Method, Actions } from "src/enum/enums"

export class ServiceHolder {

    /**
     * Get all post data
     */
    private getAllPost(): IRequestOptions {
        return {
            action: Actions.ALL_POSTS,
            method: Method.GET,
            relativeUrl: "posts",
            showLoader: false,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
    /**
     * Get single post data
     * @param body id of the post
     */
    private getPost(body: { id: number }): IRequestOptions {
        return {
            action: Actions.SINGLE_POST,
            method: Method.GET,
            relativeUrl: `posts/${body.id}`,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
    /**
     * Creates a new post
     * @param body data to create a new post
     */
    private setPost(body: {
        id: number,
        title: string,
        body: string,
        userId: number
    }): IRequestOptions {
        return {
            action: Actions.SET_POST,
            method: Method.POST,
            relativeUrl: `posts`,
            body: body,
            timeout: 10000,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
    }
}
