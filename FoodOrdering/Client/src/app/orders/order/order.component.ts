import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/order.service';
import { OrderItemsComponent } from '../order-items/order-items.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public OrderId: Number;
  public OrderNumber = Math.floor(100000 + Math.random() * 900000).toString();;
  public UserId: string;
  public PaymentMethod: string;
  public Total: number = 0;

  constructor(public service: OrderService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.GetUserId();
  }

  // get Claim User ID from Database
  GetUserId(){
    this.service.GetUserServiceId().subscribe((res :any) => {
      this.UserId = res.id;
    })
  }

  Ordering(){
    var body = {
      OrderId: this.OrderId,
      OrderNumber: this.OrderNumber,
      UserId: this.UserId,
      PaymentMethod: this.PaymentMethod,
      Total: this.Total,
      // Add More Items
      OrderItems: this.service.orderItems
    };
    this.service.OrderingService(body).subscribe((res:any) => {
        this.router.navigateByUrl('/orders');
    })
  }

  AddItem(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
      console.log(res)
    });
  }

  updateGrandTotal(){
    this.Total = this.service.orderItems.reduce((previous, current) => {
        return previous + current.Total;
    }, 0)
  }

  DeleteItem(i){
    this.service.orderItems.splice(i, 1);
    console.log(i);
  }

}
