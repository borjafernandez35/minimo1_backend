import { Request, Response } from 'express';
import { IFriend } from '../models/friends/models';
import FriendService from '../models/friends/service';
import UserService from '../models/users/service';
import e = require('express');
import * as mongoose from 'mongoose';

export class FriendController {

    private friend_service: FriendService = new FriendService();
    private user_service: UserService = new UserService();

    public async createFriend(req: Request, res: Response) {
        try{
            // this check whether all the filds were send through the request or not
            if (req.body.namefriend  && req.body.likes && req.body.age){
                const friend_params:IFriend = {
                    nameFriend: req.body.nameFriend,
                    age:req.body.age,
                    likes: req.body.likes,
                    state: true
                };
                const friend_data = await this.friend_service.createFriend(friend_params);
                await this.friend_service.addUserToFriend(req.body.nameFriend, friend_data._id);
                return res.status(201).json({ message: 'Friend created successfully', friend: friend_data });
            }else{            
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

   

    public async getAll(req: Request, res: Response) {
        try {
            console.log("funciona get all");
            const friend_filter = {};
            const friend_data = await this.friend_service.getAll(friend_filter);
            let total=friend_data.length;
            const page = Number(req.params.page); // Convertir a número
            const limit = Number(req.params.limit); // Convertir a número
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            let totalPages= Math.ceil(total/limit);
    
            
            const resultFriend = friend_data.slice(startIndex, endIndex);
            console.log(resultFriend, totalPages,total);
            return res.status(200).json({friends:resultFriend,totalPages:totalPages,totalFriend:total});
        } catch (error) {
            
            console.error('Error en la solicitud:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    public async deleteFriend(req: Request, res: Response) {
        try {
            if (req.params.id) {
                // Delete post
                const delete_details = await this.friend_service.deleteFriend(req.params.id);
                if (delete_details.deletedCount !== 0) {
                    // Send success response if user deleted
                    return res.status(200).json({ message: 'Successful'});
                } else {
                    // Send failure response if user not found
                    return res.status(400).json({ error: 'Post not found' });
                }
            } else {
                // Send error response if ID parameter is missing
                return res.status(400).json({ error: 'Missing Id' });
            }
        } catch (error) {
            // Catch and handle any errors
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async updateFriend(req: Request, res: Response) {
        try {
            if (req.params.id) {
                const friend_filter = { _id: req.params.id };
                // Fetch user
                const activity_data = await this.friend_service.filterFriend(friend_filter);
                if (!activity_data) {
                    // Send failure response if user not found
                    return res.status(400).json({ error: 'Activity not found'});
                }
    
                const friend_params: IFriend = {
                    nameFriend: req.body.nameFriend,
                    likes: req.body.likes,
                    age: req.body.age,
                    state: true
                };
                await this.friend_service.updateFriend(friend_params, friend_filter);
                //get new friend data
                const new_friend_data = await this.friend_service.filterFriend(friend_filter);
                // Send success response
                return res.status(200).json({ data: new_friend_data, message: 'Successful update'});
            } else {
                // Send error response if ID parameter is missing
                return res.status(400).json({ error: 'Missing ID parameter' });
            }
        } catch (error) {
            // Catch and handle any errors
            console.error("Error updating:", error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}