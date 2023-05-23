import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";

@Entity()
@ObjectType()
export class Api {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  code: string;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field()
  emoji: string;

  @Column({ nullable: true })
  @Field()
  continentCode: string;
}

@ObjectType()
export class Api2_1 {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  emoji: string;
}

@ObjectType()
export class Api2_2 {
  @Field()
  name: string;
}
