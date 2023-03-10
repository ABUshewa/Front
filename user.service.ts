import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl="http://localhost:8080/";

  constructor(private httpClient:HttpClient) { }

  
//get all employee
  getEmployeeList(): Observable<any> {  
    return this.httpClient.get(`${this.usersUrl}`+'AllUsers');  
  }  
  //add employee
  createEmployee(Employee: object): Observable<object> {  
    return this.httpClient.post(`${this.usersUrl}`+'AddUser', User);  
  }  
  //delete employee
  deleteEmployee(id: number): Observable<any> {  
    return this.httpClient.delete(`${this.usersUrl}/deleteUser/${id}`, { responseType: 'text' });  
  }  
  //get one employee
  getEmployee(id: number): Observable<Object> {  
    return this.httpClient.get(`${this.usersUrl}/user/${id}`);  
  }  
  // update employee
  updateEmployee(id: number, value: any): Observable<Object> {  
    return this.httpClient.post(`${this.usersUrl}/update/${id}`, value);  
  }  
}
