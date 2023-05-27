import { IAuthor } from "./IAuthor";

export interface IPhoto {
    _id: string
    title: string;
    image: string;
    author: IAuthor
}