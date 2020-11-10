import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemService } from 'src/app/shared/item.service';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  ItemList = [];

  public OrderItemId: number;
  public ItemId: number;
  public OrderId: number;
  public Total: number = 0;
  public Name: string = '';
  public Price: number = 0;
  public Quantity: number = 0;
  public isValid: boolean = false;

  constructor(
              public dialogRef: MatDialogRef<OrderItemsComponent>,
              private service: ItemService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.service.getItemsList().subscribe((data:any) => {
       this.ItemList = data;
       console.log(data);
    });
  }

    updatePrice(item){
      if(item.selectedIndex == 0){
        this.Price = 0;
      } else {
        this.Price = this.ItemList[item.selectedIndex-1].price;
        this.Name = this.ItemList[item.selectedIndex-1].name;
      }
      this.updateTotal();
   }

   updateTotal(){
     if(this.Price != null){
       var total = this.Price * this.Quantity;
       this.Total = total;
     }
   }

   onSubmit(form){
    this.validateForm();
    if(this.isValid){
      this.orderService.orderItems.push(form.value);
      console.log('Name: ' + form.name);
    }
    this.dialogRef.close();
   }

   validateForm(){
     if(this.ItemId == 0){
       this.isValid = false;
     } 
     else if (this.Quantity == 0){
       this.isValid = false;
     } 
     else{
       this.isValid = true;
     }
   }
}