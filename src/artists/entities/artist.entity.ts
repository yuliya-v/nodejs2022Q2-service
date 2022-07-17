import { v4 } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';

export class Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor(data: CreateArtistDto) {
    this.id = v4();
    this.name = data.name;
    this.grammy = data.grammy;
  }
}
