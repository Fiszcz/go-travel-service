import {ImageInterface} from "../../schemas/image.schema";

export interface CreatePostDto {
    user: string;
    pin: string;
    multimedia: ImageInterface[];
    text: string;
}
