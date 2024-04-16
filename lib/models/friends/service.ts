import { IFriend } from './models';
import friends from './schema';
import users from './schema';
import { Types } from 'mongoose';
import * as mongoose from 'mongoose';

export default class UserService {

    
    public async createFriend(friend_params: IFriend): Promise<IFriend> {
        try {
            const session = new friends (friend_params);
            const result = await session.save();
            // Convert _id to string
            const newFriend: IFriend = { ...result.toObject(), _id: result._id };
            return newFriend;
        } catch (error) {
            throw error;
        }
    }

    public async filterFriend(query: any): Promise<IFriend | null> {
        try {
            return await friends.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async updateFriend(friend_params: IFriend, friend_filter: any): Promise<void> {
        try {
            await friends.findOneAndUpdate(friend_filter, friend_params);
        } catch (error) {
            throw error;
        }
    }

    public async deleteFriend(_id: string): Promise<{ deletedCount: number }> {
        try {
            const query = { _id: _id };
            const update = { active: false };
            const result = await friends.updateOne(query, update);
            return { deletedCount: result.modifiedCount };
        } catch (error) {
            throw error;
        }
    }

    public async addUserToFriend(userId: Types.ObjectId, friendId: Types.ObjectId): Promise<void> {
        try {
            // Retrieve the user document by ID
            const friend = await friends.findById(friendId);
            if (!friend) {
                throw new Error('User not found');
            }

            // Add the post ID to the user's array of posts
            friend.nameFriend.push(userId);

            // Save the updated user document
            await friend.save();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

  

   

  

    public async getAll(query: any): Promise<IFriend[] | null> {
            console.log(query,"estoy dentro del getAll");
            // Find the user document and populate the 'posts' field
            console.log(friends);
            return await friends.find(query);
    }
    

}