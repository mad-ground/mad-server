import { Injectable } from '@nestjs/common';

//실제 로직을 담음

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
