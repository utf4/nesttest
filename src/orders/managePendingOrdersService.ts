import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { OrdersService } from './orders.service';

@Injectable()
export class ManagePendingOrderService {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private orderService: OrdersService,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES, {
    name: 'pendingOrders',
  })
  async pendingOrdersCron() {
    console.log("Job is running...")
    let pendingOrders = await this.orderService.getAllPendingOrders();
    if (pendingOrders.length > 0) {
      return this.orderService.resetCountAndOrderStatus(pendingOrders);
    }
  }
}
