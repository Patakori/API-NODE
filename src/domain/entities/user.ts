// src/domain/entities/User.ts
import { UserProfile } from '@prisma/client';
import { BaseModel } from './base/base-model';
import { IUser } from '../interfaces/i-user';
import { Role } from './role';

export class User extends BaseModel {
  name: string;
  email: string;
  role: Role;
  passwordHash: string;
  userProfiles?: UserProfile[];

  constructor(props: IUser) {
    // Chama o construtor da classe base com as propriedades relacionadas à BaseModel
    super(props);

    // Atribui as demais propriedades específicas de User
    this.name = props.name;
    this.email = props.email;
    this.role = props.role;
    this.passwordHash = props.passwordHash;
    this.userProfiles = props.userProfiles;
  }

  // Método para atualizar o usuário e modificar updatedAt
  update(name: string, email: string) {
    this.name = name;
    this.email = email;
    this.updatedAt = new Date(); // Atualiza o campo updatedAt para a data atual
  }

  // Outros métodos específicos
}
