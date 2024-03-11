import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;
}
