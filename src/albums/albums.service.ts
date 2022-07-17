import { Injectable } from '@nestjs/common';
import { handleNonExistentItem } from 'src/common/utils/error-handlers';
import { validateAlbumDto, validateUuid } from 'src/common/utils/validators';
import { favoritesModel } from 'src/favorites/favorites.model';
import { tracksModel } from 'src/tracks/tracks.model';
import { albumsModel } from './albums.model';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  private db = albumsModel;
  private tracks = tracksModel;
  private favorites = favoritesModel;

  async findAll() {
    return this.db.findAll();
  }
  async create(createAlbumDto: CreateAlbumDto) {
    validateAlbumDto(createAlbumDto);
    return this.db.create(createAlbumDto);
  }

  async findById(id: string) {
    const album = await this.db.findByID(id);
    return album;
  }

  async findOne(id: string) {
    validateUuid(id);
    const album = await this.findById(id);
    if (!album) handleNonExistentItem('Album');
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    validateUuid(id);
    validateAlbumDto(updateAlbumDto);
    const album = await this.db.findByID(id);
    if (!album) handleNonExistentItem('Album');
    return this.db.update(id, updateAlbumDto);
  }

  async remove(id: string) {
    validateUuid(id);
    const album = await this.db.findByID(id);
    if (!album) handleNonExistentItem('Album');
    await this.db.delete(id);
    await this.favorites.removeAlbum(id);
    return this.tracks.removeAlbumId(id);
  }
}
