import { IUser } from "src/app/_core/models/user.interface";

export interface IRequest {
    id: number;
    message: string;
    userId: number;
    status: number;
    user: IUser;
}