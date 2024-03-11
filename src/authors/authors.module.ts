import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';

import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorsResolver, AuthorsService],
})
export class AuthorsModule {}
