import { Injectable } from '@nestjs/common';
import {
  handleInvalidPassword,
  handleNonExistentUser,
} from 'src/utils/error-handlers';
import {
  validateCreateUserDto,
  validateUpdatePasswordDto,
  validateUserId,
} from 'src/utils/validators';

import { usersModel } from './db/users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  private db = usersModel;

  async findAll() {
    return this.db.findAll();
  }

  async findOne(id: string) {
    validateUserId(id);
    const user = await this.db.findByID(id);
    if (!user) handleNonExistentUser();
    return user;
  }

  async create(userDto: CreateUserDto) {
    validateCreateUserDto(userDto);
    return this.db.create(userDto);
  }

  async update(id: string, userDto: UpdatePasswordDto) {
    validateUserId(id);
    validateUpdatePasswordDto(userDto);
    const user = await this.db.findByID(id);
    if (!user) handleNonExistentUser();
    const isPasswordCorrect = await this.db.checkPasswordValidity(id, userDto);
    if (!isPasswordCorrect) handleInvalidPassword();
    return this.db.update(id, userDto);
  }

  async remove(id: string) {
    validateUserId(id);
    const user = await this.db.findByID(id);
    if (!user) handleNonExistentUser();
    return this.db.delete(id);
  }
}
