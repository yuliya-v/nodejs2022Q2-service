import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { join } from 'path';
import { readFile } from 'fs/promises';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const doc = await readFile(join(__dirname, '..', 'doc', 'api.yaml'), 'utf-8');
  SwaggerModule.setup('api', app, parse(doc));

  await app.listen(PORT);

  console.log(`Server is running on port ${PORT}
Open API http://localhost:${PORT}/api`);
}

bootstrap();
