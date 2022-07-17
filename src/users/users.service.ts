import { Injectable } from '@nestjs/common';
import {
  handleInvalidPassword,
  handleNonExistentItem,
} from 'src/common/utils/error-handlers';
import {
  validateCreateUserDto,
  validateUpdatePasswordDto,
  validateUuid,
} from 'src/common/utils/validators';

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
    validateUuid(id);
    const user = await this.db.findByID(id);
    if (!user) handleNonExistentItem('User');
    return user;
  }

  async create(userDto: CreateUserDto) {
    validateCreateUserDto(userDto);
    return this.db.create(userDto);
  }

  async update(id: string, userDto: UpdatePasswordDto) {
    validateUuid(id);
    validateUpdatePasswordDto(userDto);
    const user = await this.db.findByID(id);
    if (!user) handleNonExistentItem('User');
    const isPasswordCorrect = await this.db.checkPasswordValidity(id, userDto);
    if (!isPasswordCorrect) handleInvalidPassword();
    return this.db.update(id, userDto);
  }

  async remove(id: string) {
    validateUuid(id);
    const user = await this.db.findByID(id);
    if (!user) handleNonExistentItem('User');
    return this.db.delete(id);
  }
}
