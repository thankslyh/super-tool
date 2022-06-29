declare module api {
    export interface Tag {
        code: string;
        name: string;
        id: string;
    }
    export type TagList = Tag[]

    export interface Post {
        id: string;
        title: string;
        read_num: number;
        star_num: number;
        content: string;
        cover_img: string;
    }
}
