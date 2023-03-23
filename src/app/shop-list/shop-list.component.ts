import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../user-list/user-list.component';


export class Shop{
  constructor(
  public id: number,
  public name:string,
  public addres: string,
  public owner: string
  
  ){

  }
}

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit{
  users!: User[];
  shops!: Shop[];
activeModal: any;
  closeResult!: string;
  editForm!: FormGroup;
  private deleteId!: number;
  
  constructor(private modalService: NgbModal,
    private httpClinte: HttpClient,
    private fb:FormBuilder){}
  ngOnInit(): void {
  this.getShops();
  this.getUsers();
  this.editForm=this.fb.group({
    id: [''],
    name: ['',Validators.required],
    addres: ['',Validators.required],
    owner: ['',Validators.required]
  });
  
  }
//for select dropdown list of owners
  getUsers(){
    this.httpClinte.get<any>('http://localhost:8080/AllUsers').subscribe(
      response => {
        console.log(response);
        this.users = response;
      }
    );
  }
  getShops(){
    this.httpClinte.get<any>('http://localhost:8080/AllShops').subscribe(
      response => {
        console.log(response);
        this.shops = response;
      }
    );
  }
  onSubmit(f: NgForm) {
   
    const url = 'http://localhost:8080/AddShop';
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

  openDetails(targetModal: any, shop: Shop) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('id1')!.setAttribute('value', shop.id.toString());
    document.getElementById('name1')!.setAttribute('value', shop.name);
   document.getElementById('addres1')!.setAttribute('value', shop.addres);
   document.getElementById('owner1')!.setAttribute('value', shop.owner);
 }
 openEdit(targetModal: any, shop: Shop) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'lg'
 });
 this.editForm.patchValue( {
  id: shop.id, 
  name: shop.name,
  addres: shop.addres,
  owner: shop.owner
  });
}



onSave() {
  const editURL = 'http://localhost:8080/Updateshop/' + this.editForm.value.id;
  console.log(this.editForm.value);
  this.httpClinte.put(editURL, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}



openDelete(targetModal: any, shop: Shop) {
  this.deleteId = shop.id;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}




onDelete() {
  const deleteURL = 'http://localhost:8080/deleteshop/' + this.deleteId ;
  this.httpClinte.delete(deleteURL)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });
}



  
}
