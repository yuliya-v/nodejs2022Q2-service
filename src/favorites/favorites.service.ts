import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { validateUuid } from 'src/common/utils/validators';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesResponse } from './entities/favorites.entity';
import { favoritesModel } from './favorites.model';
import {
  handleNonExistentEntity,
  handleNonFavoriteEntity,
} from './utils/error-handlers';

@Injectable()
export class FavoritesService {
  db = favoritesModel;

  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
  ) {}

  async findAll(): Promise<FavoritesResponse> {
    const favs = await this.db.getAll();
    return {
      artists: await Promise.all(
        favs.artists.map((item) => this.artistsService.findOne(item)),
      ),
      albums: await Promise.all(
        favs.albums.map((item) => this.albumsService.findOne(item)),
      ),
      tracks: await Promise.all(
        favs.tracks.map((item) => this.tracksService.findOne(item)),
      ),
    };
  }

  async addArtist(id: string) {
    validateUuid(id);
    const item = await this.artistsService.findById(id);
    if (!item) handleNonExistentEntity('Artist');
    return this.db.addArtist(id);
  }

  async removeArtist(id: string) {
    validateUuid(id);
    const item = await this.db.findArtist(id);
    if (!item) handleNonFavoriteEntity('Artist');
    return this.db.removeArtist(id);
  }

  async addAlbum(id: string) {
    validateUuid(id);
    const item = await this.albumsService.findById(id);
    if (!item) handleNonExistentEntity('Album');
    return this.db.addAlbum(id);
  }

  async removeAlbum(id: string) {
    validateUuid(id);
    const item = await this.db.findAlbum(id);
    if (!item) handleNonFavoriteEntity('Album');
    return this.db.removeAlbum(id);
  }

  async addTrack(id: string) {
    validateUuid(id);
    const item = await this.tracksService.findById(id);
    if (!item) handleNonExistentEntity('Track');
    return this.db.addTrack(id);
  }

  async removeTrack(id: string) {
    validateUuid(id);
    const item = await this.db.findTrack(id);
    if (!item) handleNonFavoriteEntity('Track');
    return this.db.removeTrack(id);
  }
}
