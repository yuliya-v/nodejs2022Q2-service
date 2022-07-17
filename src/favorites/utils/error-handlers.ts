import { HttpException, HttpStatus } from '@nestjs/common';

export const handleNonExistentEntity = (
  entity: 'Track' | 'Artist' | 'Album',
) => {
  throw new HttpException(
    `${entity} doesn't exist`,
    HttpStatus.UNPROCESSABLE_ENTITY,
  );
};

export const handleNonFavoriteEntity = (
  entity: 'Track' | 'Artist' | 'Album',
) => {
  throw new HttpException(`${entity} isn't favorite`, HttpStatus.NOT_FOUND);
};
