import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateTrackDto } from 'src/tracks/dto/create-track.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdatePasswordDto } from 'src/users/dto/update-password.dto';
import { validate } from 'uuid';

export const validateUuid = (id: string) => {
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

export const validateCreateTrackDto = (body: CreateTrackDto) => {
  if (
    typeof body.name !== 'string' ||
    typeof body.duration !== 'number' ||
    !('artistId' in body) ||
    !('albumId' in body)
  ) {
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
