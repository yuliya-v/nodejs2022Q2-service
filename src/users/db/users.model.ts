import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { User } from '../entities/user.entity';

export class UsersModel {
  private data: User[] = [];

  public async findAll() {
    return this.data.map((user) => {
      const { password, ...responseBody } = user;
      return responseBody;
    });
  }

  private async findUser(id: string) {
    return this.data.find((user) => user.id === id);
  }

  public async findByID(id: string) {
    const user = await this.findUser(id);
    if (!user) return;
    const { password, ...responseBody } = user;
    return responseBody;
  }

  public async create(userDto: CreateUserDto) {
    const newUser = new User(userDto.login, userDto.password);
    this.data.push(newUser);
    const { password, ...responseBody } = newUser;
    return responseBody;
  }

  public async update(id: string, userDto: UpdatePasswordDto) {
    const userToUpdate = this.data.find((user) => user.id === id);
    userToUpdate.password = userDto.newPassword;
    userToUpdate.version += 1;
    userToUpdate.updatedAt = Date.now();
    const { password, ...responseBody } = userToUpdate;
    return responseBody;
  }

  public async delete(id: string) {
    const userIndex = this.data.findIndex((user) => user.id === id);
    this.data.splice(userIndex, 1);
  }

  public async checkPasswordValidity(id: string, userDto: UpdatePasswordDto) {
    const user = await this.findUser(id);
    if (user.password === userDto.oldPassword) return true;
    return false;
  }
}

export const usersModel = new UsersModel();
