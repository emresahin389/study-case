import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/service/person-service.service';
import { UserlistService } from 'src/app/service/userlist.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  public userList = [];
  
  constructor(
    private listService: UserlistService,
    private PersonService: PersonService,
  ) { }

  ngOnInit() {
    this.listService.getList().subscribe({
      next: (d:any) => {
        this.userList = d!.data;
      },
      error: (e) => {
        setTimeout(() => {
          alert("Sayfa yüklenemedi.")
    }, 300);
   
      },
    });
  };
  deleteUser(el: any){
    this.PersonService.deleteUser(el.target.getAttribute("row")).subscribe({
      next: (d:any) => {
        alert("Kullanıcı başarıyla silindi.")
        this.listService.getList().subscribe({
          next: (d:any) => {
            this.userList = d!.data;
          },
          error: (e) => {
            setTimeout(() => {
              alert("Sayfa yüklenemedi.")
        }, 300);
       
          },
        });
      },
      error: (e) => {
        setTimeout(() => {
          alert("Sayfa yüklenemedi.")
    }, 300);
   
      },
    });

  };
  editUser(){

  }

}
