import { DataBase } from 'src/common/db/database';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';

class TracksModel extends DataBase<Track> {
  public async create(trackDto: CreateTrackDto) {
    const newTrack = new Track(trackDto);
    this.data.push(newTrack);
    return newTrack;
  }

  public async update(id: string, trackDto: CreateTrackDto) {
    const trackToUpdate = await this.findByID(id);
    Object.entries(trackDto).forEach(([key, value]) => {
      trackToUpdate[key] = value;
    });
    return trackToUpdate;
  }

  public async removeAlbumId(id: string) {
    this.data.forEach((item) => {
      if (item.albumId === id) {
        item.albumId = null;
      }
    });
  }

  public async removeArtistId(id: string) {
    this.data.forEach((item) => {
      if (item.artistId === id) {
        item.artistId = null;
      }
    });
  }
}

export const tracksModel = new TracksModel();
