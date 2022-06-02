import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, retry } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PersonService implements CanActivate {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService : PersonService) {}

  public checkToken() {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.getToken(),
            })
        }
    return this.http.get('http://localhost:3000/login', httpOptions)
      .pipe();
    }
 
  public getToken(): string {
        if (window.localStorage.getItem("appToken") != null) {
            return window.localStorage.getItem("appToken");
        }
    }

  public login(userName: string, password: string) {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }       
    return this.http.post('http://localhost:3000/login',  { userName: userName, password: password }, httpOptions)
      .pipe();
  }

  public addUser(userName: string, password: string, name: string, role:string) {
    let httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.getToken(),
        })
    }       
return this.http.post('http://localhost:3000/user/add',  { userName: userName, password: password, name: name, role: role }, httpOptions)
  .pipe();
}
  public deleteUser(id:Number) {
    let httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : "application/json",
        'Authorization': 'Bearer ' + this.getToken()
      })
    }
  return this.http.post('http://localhost:3000/user/delete', {id : id}, httpOptions)
  .pipe();
}

  public editUser(name: string, role:string){
    let httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.getToken(),
      })
    }
    return this.http.post('http://localhost:3000/user/edit', { name: name, role: role}, httpOptions)
  .pipe();
  }

  public checkTokenActive() {
    this.checkToken().subscribe({
      next: (d) => {},
      error: (e) => {
        if (!e['error']['status']) this.router.navigateByUrl('/login');
      },
    });
  }

  public logout() {
    window.localStorage.removeItem("appToken");
    setTimeout(() => {
        this.router.navigateByUrl('/login');
    }, 150);
    return;
  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (window.localStorage.getItem("appToken") != null) {
      return true;
    } else {
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 150);
      return false;
    }
  };

  private chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  private atob(input) {
      var str = String(input).replace(/=+$/, '');
      if (str.length % 4 == 1) {
          throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
      }
      for (
          // initialize result and counters
          var bc = 0, bs, buffer, idx = 0, output = '';
          // get next character
          buffer = str.charAt(idx++);
          // character found in table? initialize bit storage and add its ascii value;
          ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
              // and if not first of each 4 characters,
              // convert the first 8 bits to one ascii character
              bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
      ) {
          // try to find character in table (0-63, not found => -1)
          buffer = this.chars.indexOf(buffer);
      }
      return output;
  };

    parseJwt() {
      var base64Url = this.getToken().split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(this.atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
  };
  

}
