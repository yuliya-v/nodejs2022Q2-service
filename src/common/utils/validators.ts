import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
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

export const validateArtistDto = (body: CreateArtistDto | UpdateArtistDto) => {
  if (typeof body.grammy !== 'boolean' || typeof body.name !== 'string') {
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

export const validateAlbumDto = (body: CreateAlbumDto) => {
  if (
    typeof body.name !== 'string' ||
    typeof body.year !== 'number' ||
    !('artistId' in body)
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
