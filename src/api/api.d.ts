declare module api {
    export interface Tag {
        code: string;
        name: string;
        id: string;
    }
    export type TagList = Tag[]

    export interface SimplePost {
        id: string;
        title: string;
        read_num: number;
        star_num: number;
        cover_img: string;
    }
    export type PostList = SimplePost[]

    export interface Post extends SimplePost {
        content: string;
    }
}
