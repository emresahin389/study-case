import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/service/person-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],

})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public kullaniciAdi:string="";
  public location: Location;
  constructor(location: Location,  private element: ElementRef, private router: Router, private authService:PersonService) {
    this.location = location;

  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.kullaniciAdi = this.authService.parseJwt().name;
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  

}
