import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

    export class User{
      constructor(
        public id: number,
        public name: string,
        public address: string,
        public dob: string
      ){
    
      }
    }

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  users!: User[];
activeModal: any;
  closeResult!: string;
  editForm!: FormGroup;
  private deleteId!: number;

 
  
  constructor(private modalService: NgbModal,
    private httpClinte: HttpClient,
    private fb:FormBuilder){}
  ngOnInit(): void {
  this.getEmployees();
  this.editForm=this.fb.group({
    id: [''],
    name: ['',Validators.required],
    address: ['',Validators.required],
    dob: ['',Validators.required]
  });
  
  }
  getEmployees(){
    this.httpClinte.get<any>('http://localhost:8080/AllUsers').subscribe(
      response => {
        console.log(response);
        this.users = response;
      }
    );
  }
  onSubmit(f: NgForm) {
   
    const url = 'http://localhost:8080/AddUser';
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

  openDetails(targetModal: any, user: User) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('id1')!.setAttribute('value', user.id.toString());
    document.getElementById('name1')!.setAttribute('value', user.name.toString());
   document.getElementById('address1')!.setAttribute('value', user.address);
   document.getElementById('dob1')!.setAttribute('value', user.dob.toString());
 }
 openEdit(targetModal: any, user: User) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });
 this.editForm.patchValue( {
  id: user.id, 
  name: user.name,
  address: user.address,
  dob: user.dob
  });
}



onSave() {
  const editURL = 'http://localhost:8080/Updateuser/' + this.editForm.value.id;
  console.log(this.editForm.value);
  this.httpClinte.put(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}



openDelete(targetModal: any, user: User) {
  this.deleteId = user.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}




onDelete() {
  const deleteURL = 'http://localhost:8080/deleteuser/' + this.deleteId ;
  this.httpClinte.delete(deleteURL)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}

  
}
