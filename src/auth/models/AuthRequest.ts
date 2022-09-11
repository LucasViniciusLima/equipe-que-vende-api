import { Request } from 'express';
import { User } from '../../user/interfaces/user.entity';

export interface AuthRequest extends Request {
  user: User;
}