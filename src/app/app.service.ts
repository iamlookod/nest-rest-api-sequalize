import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  start(): string {
    return 'Betkub Report queue service is running...';
  }
}
