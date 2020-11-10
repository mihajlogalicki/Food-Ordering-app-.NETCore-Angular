import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public orderItems = [];

  constructor(private service: HttpClient) { }

  OrderingService(values: any){
    return this.service.post(environment.apiBaseUrl + '/Order', values);
  }

  GetUserServiceId(){
    return this.service.get(environment.apiBaseUrl + '/UserProfile');
  }

  getAllOrdersService(){
    return this.service.get(environment.apiBaseUrl + '/Order');
  }
  
}
