import 'reflect-metadata';
import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

const hbs = require('hbs');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const viewsDir = join(__dirname, '..', 'views');
  app.setBaseViewsDir(viewsDir);
  app.setViewEngine('hbs');
  hbs.registerPartials(join(viewsDir, 'partials'));

    hbs.registerHelper('eq', (a: unknown, b: unknown) => a === b);

  app.useStaticAssets(join(__dirname, '..', 'node_modules', 'bootstrap', 'dist'), {
    prefix: '/static/bootstrap/',
  });

  await app.listen(Number(process.env.PORT) || 8080, '0.0.0.0');
}
bootstrap();