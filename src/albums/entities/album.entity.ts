import { v4 } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';

export class Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist

  constructor(data: CreateAlbumDto) {
    this.id = v4();
    this.name = data.name;
    this.year = data.year;
    this.artistId = data.artistId;
  }
}
