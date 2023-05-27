import {NextFunction, Response} from 'express';
import User from '../models/User';
import {IRequest} from '../interfaces/IRequest';


const authMiddleware = async (req: IRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.get('Authorization');

  if(!token) {
    res.status(401).send({error: 'No token presented'});
    return;
  }

  const user = await User.findOne({token});

  if(!user) {
    res.status(400).send({message: 'User not found'});
    return;
  }

  req.user = user;
  next();
};

export default authMiddleware;