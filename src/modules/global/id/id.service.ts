import { Injectable } from '@nestjs/common';

@Injectable()
export class IdService {
  async generateId(): Promise<number> {
    return new Promise(async (resolve) => {
      let date = +Date.now() + '';
      date = date.slice(5, 11);

      const randomNums = await this.generateNums();
      const generatedId = +(date + randomNums);
      resolve(generatedId);
    });
  }
  private async generateNums(): Promise<string> {
    //Generate number with length 6
    return new Promise((resolve) => {
      const randomNums = Math.floor(Math.random() * 1000000);
      resolve(randomNums.toString().padEnd(6, '0'));
    });
  }
}
