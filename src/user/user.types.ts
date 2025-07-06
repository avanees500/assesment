import { User } from 'src/database/models/user.model';

export type UserResponse = Omit<User, 'password'>;
