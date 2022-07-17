import { DataBase } from 'src/common/db/database';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

class AlbumsModel extends DataBase<Album> {
  public async create(albumDto: CreateAlbumDto) {
    const newAlbum = new Album(albumDto);
    this.data.push(newAlbum);
    return newAlbum;
  }

  public async update(id: string, albumDto: UpdateAlbumDto) {
    const albumToUpdate = await this.findByID(id);
    Object.entries(albumDto).forEach(([key, value]) => {
      albumToUpdate[key] = value;
    });
    return albumToUpdate;
  }
}

export const albumsModel = new AlbumsModel();
