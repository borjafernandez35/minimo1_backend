import { Application, Request, Response } from 'express';
import { FriendController } from '../controllers/friendController';

export class FriendRoutes {

    private friend_controller: FriendController = new FriendController();

    public route(app: Application) {
        
        app.post('/friend', (req: Request, res: Response) => {
            this.friend_controller.createFriend(req, res);
        });

        app.get('/friend/:page/:limit', (req: Request, res: Response,) => {
            this.friend_controller.getAll(req, res);
           
        });

        

        app.put('/friend/:id', (req: Request, res: Response) => {
            this.friend_controller.updateFriend(req, res);
        });

        app.put('/friend/delete/:id', (req: Request, res: Response) => {
            this.friend_controller.deleteFriend(req, res);
        });

    }
}