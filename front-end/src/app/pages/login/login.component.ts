import { Component, AfterViewInit } from '@angular/core';
import { PersonService } from 'src/app/service/person-service.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  password : string;
  userName : string;
  constructor(public service: PersonService, private router: Router) {}

  onSubmit() {
    if (this.userName != '' && this.password != '') {
      setTimeout(() => {

        this.service.login(this.userName, this.password).subscribe({
          next: (d) => {
            window.localStorage.setItem("appToken", d['data']);
        this.router.navigateByUrl('/table');
          },
          error: (e) => {
            setTimeout(() => {
              alert("Bilgileri kontrol ediniz.")
          document.getElementById("passwordInput").focus();
        }, 300);
       
          },
        });
      }, 300);
    }
  }

  
  ngAfterViewInit(): void {
    this.service.checkToken().subscribe((data: any) => {
        if (data.success != false) {
            this.router.navigateByUrl('person');
        }
    });
    //throw new Error("Method not implemented.");
}

Redirect() {
    this.service.login(this.userName, this.password).subscribe((data: any) => {
        window.localStorage.setItem("appToken", data.data);
        this.router.navigateByUrl('person');
    });
}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

}
