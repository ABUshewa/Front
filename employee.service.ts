import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
private empURL="http://localhost:8080/";

  constructor(private httpClient:HttpClient) { }

  
//get all employee
  getEmployeeList(): Observable<any> {  
    return this.httpClient.get(`${this.empURL}`+'AllEmployees');  
  }  
  //add employee
  createEmployee(Employee: object): Observable<object> {  
    return this.httpClient.post(`${this.empURL}`+'AddEmployee', Employee);  
  }  
  //delete employee
  deleteEmployee(id: number): Observable<any> {  
    return this.httpClient.delete(`${this.empURL}/deleteEmp/${id}`, { responseType: 'text' });  
  }  
  //get one employee
  getEmployee(id: number): Observable<Object> {  
    return this.httpClient.get(`${this.empURL}/employee/${id}`);  
  }  
  // update employee
  updateEmployee(id: number, value: any): Observable<Object> {  
    return this.httpClient.post(`${this.empURL}/update/${id}`, value);  
  }  

}
