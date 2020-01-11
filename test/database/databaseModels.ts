import * as mongoose from "mongoose";
import {CountriesSchema, Country} from "../../src/schemas/countires.schema";
import {Pin, PinSchema} from "../../src/schemas/pin.schema";
import {Post, PostsSchema} from "../../src/schemas/posts.schema";
import {User, UsersSchema} from "../../src/schemas/user.schema";
import {Visit, VisitSchema} from "../../src/schemas/visit.schema";

export const CountriesModel = mongoose.model<Country>('countries', CountriesSchema);

export const PinModel = mongoose.model<Pin>('pins', PinSchema);

export const PostModel = mongoose.model<Post>('posts', PostsSchema);

export const UserModel = mongoose.model<User>('users', UsersSchema);

export const VisitModel = mongoose.model<Visit>('visits', VisitSchema);
