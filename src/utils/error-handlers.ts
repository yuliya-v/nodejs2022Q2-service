import { HttpException, HttpStatus } from '@nestjs/common';

export const handleNonExistentItem = (item: 'User' | 'Track') => {
  throw new HttpException(`${item} doesn't exist`, HttpStatus.NOT_FOUND);
};

export const handleInvalidPassword = () => {
  throw new HttpException('Invalid password', HttpStatus.FORBIDDEN);
};
