import { HttpException, HttpStatus } from '@nestjs/common';

export const handleNonExistentUser = () => {
  throw new HttpException("User doesn't exist", HttpStatus.NOT_FOUND);
};

export const handleInvalidPassword = () => {
  throw new HttpException('Invalid password', HttpStatus.FORBIDDEN);
};
