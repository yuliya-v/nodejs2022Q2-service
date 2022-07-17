import { Favorites } from './entities/favorites.entity';

export class FavoritesModel {
  data: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  async getAll() {
    return this.data;
  }

  async addArtist(id: string) {
    this.data.artists.push(id);
  }

  async removeArtist(id: string) {
    const index = this.data.artists.findIndex((item) => item === id);
    if (index > -1) this.data.artists.splice(index, 1);
  }

  async addAlbum(id: string) {
    this.data.albums.push(id);
  }

  async removeAlbum(id: string) {
    const index = this.data.albums.findIndex((item) => item === id);
    if (index > -1) this.data.albums.splice(index, 1);
  }

  async addTrack(id: string) {
    this.data.tracks.push(id);
  }

  async removeTrack(id: string) {
    const index = this.data.tracks.findIndex((item) => item === id);
    if (index > -1) this.data.tracks.splice(index, 1);
  }

  async findTrack(id: string) {
    return this.data.tracks.find((item) => item === id);
  }
  async findAlbum(id: string) {
    return this.data.albums.find((item) => item === id);
  }
  async findArtist(id: string) {
    return this.data.artists.find((item) => item === id);
  }
}

export const favoritesModel = new FavoritesModel();
