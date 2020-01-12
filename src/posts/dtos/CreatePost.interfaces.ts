import {ImageInterface} from "../../schemas/image.schema";

export interface CreatePostDto {
    userId: string;
    pin: string;
    multimedia?: ImageInterface[];
    text?: string;
}
