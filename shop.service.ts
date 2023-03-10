import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private shopUrl="http://localhost:8080/";

  constructor(private httpClient:HttpClient) { }

  
//get all employee
  getEmployeeList(): Observable<any> {  
    return this.httpClient.get(`${this.shopUrl}`+'AllShops');  
  }  
  //add employee
  createEmployee(Employee: object): Observable<object> {  
    return this.httpClient.post(`${this.shopUrl}`+'AddShop', User);  
  }  
  //delete employee
  deleteEmployee(id: number): Observable<any> {  
    return this.httpClient.delete(`${this.shopUrl}/deleteshop/${id}`, { responseType: 'text' });  
  }  
  //get one employee
  getEmployee(id: number): Observable<Object> {  
    return this.httpClient.get(`${this.shopUrl}/shop/${id}`);  
  }  
  // update employee
  updateEmployee(id: number, value: any): Observable<Object> {  
    return this.httpClient.post(`${this.shopUrl}/update/${id}`, value);  
  }  
  
}
