export class DataBase<T extends { id: string }> {
  protected data: Array<T> = [];

  public async findAll() {
    return this.data;
  }

  public async findByID(id: string) {
    return this.data.find((item) => item.id === id);
  }

  public async delete(id: string) {
    const index = this.data.findIndex((item) => item.id === id);
    this.data.splice(index, 1);
  }
}
