import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from "../schemas/user.schema";
import {Model} from "mongoose";
import {CreateUser} from "./dtos/CreateUser.interfaces";
import {SignIn} from "./interfaces/SignIn.interfaces";
import {SetPhoto} from "./interfaces/SetPhoto.interfaces";

@Injectable()
export class UsersService {
    constructor(@InjectModel('users') private readonly userModel: Model<User>) {
    }

    async signUpUser(newUser: CreateUser) {
        const {email, password} = newUser;
        const [firstName, lastName] = newUser.name.split(' ');

        await this.userModel.create({
            email,
            password,
            firstName,
            lastName,
        });
    }

    async signIn(loginDetails: SignIn) {
       const user = await this.userModel.findOne({email: loginDetails.email});

       if (user.password === loginDetails.password)
           return user._id;
       else
           return '';
    }

    async setPhoto(photoDetails: SetPhoto) {
        const user = await this.userModel.findById(photoDetails.userId);

        user.profilePhoto = photoDetails.profilePhoto;

        await user.save();
    }

}
