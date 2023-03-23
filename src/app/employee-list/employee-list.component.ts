import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm ,Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../employee';
import { User } from '../user-list/user-list.component';
import { Shop } from '../shop-list/shop-list.component';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{
 employees!: Employee[];
 users!: User[];
 shops!:Shop[];
activeModal: any;
  closeResult!: string;
  editForm!: FormGroup;
  private deleteId!: number;
  constructor(private modalService: NgbModal,
    private httpClinte: HttpClient,
    private fb:FormBuilder){}

  ngOnInit(): void {
  this.getEmployees();
  this.getUsers();
  this.getShops();
  this.editForm=this.fb.group({
    id: [''],
    userId: [''],
    shop: ['',Validators.required],
    salary: ['',Validators.required]
  });
  
  }

  getShops(){
    this.httpClinte.get<any>('http://localhost:8080/AllShops').subscribe(
      response => {
        console.log(response);
        this.shops = response;
      }
    );
  }
  getUsers(){
    this.httpClinte.get<any>('http://localhost:8080/AllUsers').subscribe(
      response => {
        console.log(response);
        this.users = response;
      }
    );
  }
  getEmployees(){
    this.httpClinte.get<any>('http://localhost:8080/AllEmployees').subscribe(
      response => {
        console.log(response);
        this.employees = response;
      }
    );
  }
  onSubmit(f: NgForm) {
    const url = 'http://localhost:8080/AddEmployee';
    this.httpClinte.post(url, f.value)
     .subscribe((result) => {
        this.ngOnInit(); //reload the table
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openDetails(targetModal: any, employee: Employee) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('id1')!.setAttribute('value', employee.id.toString());
    document.getElementById('userId1')!.setAttribute('value', employee.userId.toString());
   document.getElementById('shop1')!.setAttribute('value', employee.shop);
   document.getElementById('salary1')!.setAttribute('value', employee.salary.toString());
 }
 openEdit(targetModal: any, employeee: Employee) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });
 this.editForm.patchValue( {
  id: employeee.id, 
  userId: employeee.userId,
  shop: employeee.shop,
  salary: employeee.salary
  });
}



onSave() {
  const editURL = 'http://localhost:8080/Updateemp/' + this.editForm.value.id;
  console.log(this.editForm.value);
  this.httpClinte.put(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}



openDelete(targetModal: any, employee: Employee) {
  this.deleteId = employee.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}




onDelete() {
  const deleteURL = 'http://localhost:8080/deleteemp/' + this.deleteId ;
  this.httpClinte.delete(deleteURL)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}



}
