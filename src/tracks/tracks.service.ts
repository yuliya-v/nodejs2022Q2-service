import { Injectable } from '@nestjs/common';
import { handleNonExistentItem } from 'src/common/utils/error-handlers';
import {
  validateCreateTrackDto,
  validateUuid,
} from 'src/common/utils/validators';
import { favoritesModel } from 'src/favorites/favorites.model';

import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { tracksModel } from './tracks.model';

@Injectable()
export class TracksService {
  private db = tracksModel;
  private favorites = favoritesModel;

  async findAll() {
    return this.db.findAll();
  }
  async create(createTrackDto: CreateTrackDto) {
    validateCreateTrackDto(createTrackDto);
    return this.db.create(createTrackDto);
  }

  async findById(id: string) {
    const track = await this.db.findByID(id);
    return track;
  }

  async findOne(id: string) {
    validateUuid(id);
    const track = await this.findById(id);
    if (!track) handleNonExistentItem('Track');
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    validateUuid(id);
    validateCreateTrackDto(updateTrackDto);
    const track = await this.db.findByID(id);
    if (!track) handleNonExistentItem('Track');
    return this.db.update(id, updateTrackDto);
  }

  async remove(id: string) {
    validateUuid(id);
    const track = await this.db.findByID(id);
    if (!track) handleNonExistentItem('Track');
    await this.favorites.removeTrack(id);
    return this.db.delete(id);
  }
}
