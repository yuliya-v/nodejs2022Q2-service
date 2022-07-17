import { HttpException, HttpStatus } from '@nestjs/common';

export const handleNonExistentItem = (
  item: 'User' | 'Track' | 'Artist' | 'Album',
) => {
  throw new HttpException(`${item} doesn't exist`, HttpStatus.NOT_FOUND);
};

export const handleInvalidPassword = () => {
  throw new HttpException('Invalid password', HttpStatus.FORBIDDEN);
};
