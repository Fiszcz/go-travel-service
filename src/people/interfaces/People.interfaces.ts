import {ApiProperty} from "@nestjs/swagger";
import {ImageInterface} from "../../schemas/image.schema";

export interface FollowUser {
    user: string;
    userToFollow: string;
}

export interface UnfollowUser {
    user: string;
    userToUnfollow: string;
}

export class BasicDataOfUser {
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    profilePhoto: ImageInterface;
}

export class UserWithDetails extends BasicDataOfUser {
    @ApiProperty()
    user: string;

    @ApiProperty()
    visits: number;

    @ApiProperty()
    points: number;
}

export class UserWithFullData extends UserWithDetails{
    @ApiProperty()
    followers: string[]

    @ApiProperty()
    following: string[];
}
