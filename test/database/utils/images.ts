import * as fs from "fs";
import {ImageInterface} from "../../../src/schemas/image.schema";
import * as sizeOf from 'image-size';
import {PathLike} from "fs";

export function getFileFormatForImage(file: PathLike): ImageInterface {
    const bitmap = fs.readFileSync(file);
    const bufferOfImage = Buffer.from(bitmap).toString('base64');
    const imageInfo = sizeOf.imageSize(file as string);

    return {
        height_of_image: imageInfo.height,
        width_of_image: imageInfo.width,
        image: bufferOfImage,
        type_of_image: imageInfo.type as 'jpeg' | 'png',
    }
}
