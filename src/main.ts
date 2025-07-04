import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const port = process.env.PORT ?? 3440;
    const app = await NestFactory.create(AppModule);
    console.log(`Server is running on http://localhost:${port}`);
    await app.listen(port);
}
bootstrap();
