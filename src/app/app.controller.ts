import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStart(): string {
    return this.appService.start();
  }

  @Get('/stat')
  @HttpCode(200)
  heatlhCheck(): { status: string; statusCode: number } {
    return { status: 'Ok', statusCode: 200 };
  }
}
