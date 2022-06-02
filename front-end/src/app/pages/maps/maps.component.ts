import { Component, AfterViewInit } from '@angular/core';
import { PersonService } from 'src/app/service/person-service.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements AfterViewInit {
  password : string;
  userName : string;
  name : string;
  role : string;
  constructor(public service: PersonService) { }

onSubmit(){
  if (this.userName != '' && this.password != '' && this.name != '' && this.role != '') {
    setTimeout(() => {

      this.service.addUser(this.userName, this.password, this.name, this.role).subscribe({
        next: (d) => {
          console.log(d);
        },
        error: (e) => {
          setTimeout(() => {
            alert("Bilgileri kontrol ediniz.")
      }, 300);
     
        },
      });
    }, 300);
    
  }
}
  ngAfterViewInit(): void {
    
  }
    

}

