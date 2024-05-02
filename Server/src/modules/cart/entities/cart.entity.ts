import { Users } from 'src/modules/users/entities/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('Cart')
export class Cart {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @Column('json')
  items: Array<{ productId: number; quantity: number }>;

  @Column('decimal', { scale: 2, nullable: true })
  total: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
