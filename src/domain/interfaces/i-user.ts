import { UserProfile } from "@prisma/client";
import { IBaseModel } from "./i-base-model";
import { Role } from "../entities/role";


export interface IUser extends IBaseModel {
  name: string;
  email: string;
  role: Role;
  passwordHash: string;
  userProfiles?: any[];
}


