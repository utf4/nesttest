import { Transform } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import OrderItems from './orderItems.entity';
import User from './user.entity';

@Entity('orders')
class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  status: string;

  @Column({ type: 'int', nullable: true })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.order, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => OrderItems, (orderItem) => orderItem.order, { eager: true })
  orderItem: OrderItems[];
}

export default Order;
