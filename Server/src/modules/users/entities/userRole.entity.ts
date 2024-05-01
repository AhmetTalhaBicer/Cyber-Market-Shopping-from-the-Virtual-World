import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from './users.entity';

@Entity('Users_role')
export class UsersRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @ManyToOne(() => Users, (user) => user.id)
  user: Users;
}
