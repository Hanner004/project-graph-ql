import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { PostsService } from './posts.service';

import { Post } from './entities/post.entity';

import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return await this.postsService.create(createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  async findAll() {
    return await this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  async updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return await this.postsService.update(updatePostInput);
  }

  @Mutation(() => String)
  async removePost(@Args('id', { type: () => Int }) id: number) {
    return await this.postsService.remove(id);
  }
}
