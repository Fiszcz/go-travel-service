import {ImageInterface} from "../../schemas/image.schema";

export interface SetPhoto {
    user: string;
    photo: ImageInterface;
}