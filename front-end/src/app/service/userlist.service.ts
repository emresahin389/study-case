import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, retry } from 'rxjs';
import { Router } from '@angular/router';
import { PersonService } from './person-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserlistService {

  constructor(
    private http: HttpClient,
    private authService:PersonService,
    private router: Router) {} 
    public getList() {
      let httpOptions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.authService.getToken(),
          })
      }
  return this.http.get('http://localhost:3000/user/list', httpOptions)
    .pipe();
  }
}

