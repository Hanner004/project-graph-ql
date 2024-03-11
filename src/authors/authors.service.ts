import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from './entities/author.entity';

import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const newAuthor = this.authorRepository.create(createAuthorInput);
    return await this.authorRepository.save(newAuthor);
  }

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  async findOne(id: number): Promise<Author> {
    const authorFound = await this.authorRepository.findOne({ where: { id } });
    if (!authorFound) throw new NotFoundException('Author not found');

    return authorFound;
  }

  async update({
    id,
    ...updateAuthorInput
  }: UpdateAuthorInput): Promise<Author> {
    const authorFound = await this.authorRepository.findOne({ where: { id } });
    if (!authorFound) throw new NotFoundException('Author not found');

    await this.authorRepository.update(id, updateAuthorInput);

    return await this.authorRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<String> {
    const authorFound = await this.authorRepository.findOne({ where: { id } });
    if (!authorFound) throw new NotFoundException('Author not found');

    await this.authorRepository.remove(authorFound);
    return 'Author removed successfully';
  }
}
