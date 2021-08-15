import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class AppService {
  constructor(
    @InjectRedis() private readonly clientDefault: Redis, // @InjectRedis('cache') private readonly clientCache: Redis,
  ) {}

  async getHello(): Promise<string> {
    await this.clientDefault.set('foo', 'bar');
    console.log(await this.clientDefault.get('foo'));

    // await this.clientCache.set('foo', 'bar');

    return 'Hello Worlds!';
  }
}
