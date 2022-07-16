import { DataBase } from 'src/common/db/database';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

class ArtistsModel extends DataBase<Artist> {
  public async create(artistDto: CreateArtistDto) {
    const newArtist = new Artist(artistDto);
    this.data.push(newArtist);
    return newArtist;
  }

  public async update(id: string, artistDto: UpdateArtistDto) {
    const artistToUpdate = await this.findByID(id);
    Object.entries(artistDto).forEach(([key, value]) => {
      artistToUpdate[key] = value;
    });
    return artistToUpdate;
  }
}

export const artistsModel = new ArtistsModel();
