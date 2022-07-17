import { Injectable } from '@nestjs/common';
import { handleNonExistentItem } from 'src/common/utils/error-handlers';
import { validateArtistDto, validateUuid } from 'src/common/utils/validators';
import { tracksModel } from 'src/tracks/tracks.model';
import { artistsModel } from './artists.model';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  private db = artistsModel;
  private tracks = tracksModel;

  async findAll() {
    return this.db.findAll();
  }
  async create(createArtistDto: CreateArtistDto) {
    validateArtistDto(createArtistDto);
    return this.db.create(createArtistDto);
  }

  async findOne(id: string) {
    validateUuid(id);
    const track = await this.db.findByID(id);
    if (!track) handleNonExistentItem('Track');
    return track;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    validateUuid(id);
    validateArtistDto(updateArtistDto);
    const track = await this.db.findByID(id);
    if (!track) handleNonExistentItem('Track');
    return this.db.update(id, updateArtistDto);
  }

  async remove(id: string) {
    validateUuid(id);
    const track = await this.db.findByID(id);
    if (!track) handleNonExistentItem('Track');
    await this.tracks.removeAlbumId(id);
    await this.tracks.removeArtistId(id);
    return this.db.delete(id);
  }
}
