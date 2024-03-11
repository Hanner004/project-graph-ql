import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './entities/post.entity';

import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create({
    authorId,
    ...createPostInput
  }: CreatePostInput): Promise<Post> {
    const newPost = this.postRepository.create({
      ...createPostInput,
      author: { id: authorId },
    });
    return await this.postRepository.save(newPost);
  }

  async findAllByAuthor(authorId: number): Promise<Post[]> {
    return await this.postRepository.find({
      where: { author: { id: authorId } },
    });
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    const postFound = await this.postRepository.findOne({ where: { id } });
    if (!postFound) throw new NotFoundException('Post not found');

    return postFound;
  }

  async update({ id, ...updatePostInput }: UpdatePostInput): Promise<Post> {
    const postFound = await this.postRepository.findOne({ where: { id } });
    if (!postFound) throw new NotFoundException('Post not found');

    await this.postRepository.update(id, updatePostInput);

    return await this.postRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<String> {
    const postFound = await this.postRepository.findOne({ where: { id } });
    if (!postFound) throw new NotFoundException('Post not found');

    await this.postRepository.remove(postFound);
    return 'Post removed successfully';
  }

  async getAuthorByPostId(postId: number) {
    const postFound = await this.postRepository.findOne({
      where: { id: postId },
      relations: { author: true },
    });

    return postFound.author;
  }
}
