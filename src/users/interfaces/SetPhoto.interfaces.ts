import {ImageInterface} from "../../schemas/image.schema";

export interface SetPhoto {
    userId: string;
    profilePhoto: ImageInterface;
}