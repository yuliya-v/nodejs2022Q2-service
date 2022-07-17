import { Injectable } from '@nestjs/common';
import { handleNonExistentItem } from 'src/common/utils/error-handlers';
import { validateArtistDto, validateUuid } from 'src/common/utils/validators';
import { favoritesModel } from 'src/favorites/favorites.model';
import { tracksModel } from 'src/tracks/tracks.model';
import { artistsModel } from './artists.model';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  private db = artistsModel;
  private tracks = tracksModel;
  private favorites = favoritesModel;

  async findAll() {
    return this.db.findAll();
  }
  async create(createArtistDto: CreateArtistDto) {
    validateArtistDto(createArtistDto);
    return this.db.create(createArtistDto);
  }

  async findById(id: string) {
    const artist = await this.db.findByID(id);
    return artist;
  }

  async findOne(id: string) {
    validateUuid(id);
    const artist = await this.findById(id);
    if (!artist) handleNonExistentItem('Artist');
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    validateUuid(id);
    validateArtistDto(updateArtistDto);
    const artist = await this.db.findByID(id);
    if (!artist) handleNonExistentItem('Artist');
    return this.db.update(id, updateArtistDto);
  }

  async remove(id: string) {
    validateUuid(id);
    const artist = await this.db.findByID(id);
    if (!artist) handleNonExistentItem('Artist');
    await this.tracks.removeAlbumId(id);
    await this.tracks.removeArtistId(id);
    await this.favorites.removeArtist(id);
    return this.db.delete(id);
  }
}
