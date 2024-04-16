import * as mongoose from 'mongoose';

export interface IFriend {
    _id?: mongoose.Types.ObjectId;
    nameFriend: mongoose.Types.ObjectId[];
    likes: String;
    age: Number;
    activities?: mongoose.Types.ObjectId[]; // Array to store post IDs
    comments?: mongoose.Types.ObjectId[]; // Array to store post IDs
    state: Boolean;

}