import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { AuthorsService } from './authors.service';

import { Author } from './entities/author.entity';

import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Mutation(() => Author)
  async createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    return await this.authorsService.create(createAuthorInput);
  }

  @Query(() => [Author], { name: 'authors' })
  async findAll() {
    return await this.authorsService.findAll();
  }

  @Query(() => Author, { name: 'author' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.authorsService.findOne(id);
  }

  @Mutation(() => Author)
  async updateAuthor(
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
  ) {
    return await this.authorsService.update(updateAuthorInput);
  }

  @Mutation(() => String)
  async removeAuthor(@Args('id', { type: () => Int }) id: number) {
    return await this.authorsService.remove(id);
  }
}
