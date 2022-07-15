import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/users/dto/update-password.dto';
import { validate } from 'uuid';

export const validateUserId = (id: string) => {
  if (!validate(id))
    throw new HttpException('Invalid id', HttpStatus.BAD_REQUEST);
};

export const validateCreateUserDto = (body: CreateUserDto) => {
  if (typeof body.login !== 'string' || typeof body.password !== 'string') {
    throw new HttpException(
      'Body does not contain required fields',
      HttpStatus.BAD_REQUEST,
    );
  }
};

export const validateUpdatePasswordDto = (body: UpdatePasswordDto) => {
  if (
    typeof body.oldPassword !== 'string' ||
    typeof body.newPassword !== 'string'
  ) {
    throw new HttpException(
      'Body does not contain required fields',
      HttpStatus.BAD_REQUEST,
    );
  }
};
