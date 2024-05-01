import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image_url: string;
}
