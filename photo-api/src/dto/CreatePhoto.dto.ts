export class CreatePhotoDto {
    title: string;
    image: string;
    author: string;
    constructor(title: string, image: string, author: string) {
        this.title = title;
        this.image = image;
        this.author = author;
    }
}