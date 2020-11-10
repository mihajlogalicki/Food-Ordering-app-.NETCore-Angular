import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

   AllOrders: [];

  constructor(private service: OrderService) {}

  ngOnInit(): void {
    this.getAllOrders();
  }


  getAllOrders(){
    this.service.getAllOrdersService().subscribe((data:any) => {
      this.AllOrders = data;
      console.log(data);
    });
  }


}
