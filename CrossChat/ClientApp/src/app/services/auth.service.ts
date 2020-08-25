import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private http: HttpClient,
              private router: Router
 ) { this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
 this.currentUser = this.currentUserSubject.asObservable(); }

 public get currentUserValue(): User {
  return this.currentUserSubject.value;
}

  doRegister(value) {
    return this.http.post<any>(`${environment.apiUrl}/auth/register`, value);
  }

  doLogin(value) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, value)
      .pipe(map(user => {
       
        if (user) {

         
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }
        // store user details and jwt token in local storage to keep user logged in between page refreshes

      }
      ));
  }

  changePassword(password: string){
        const user = {Password: password};
    return this.http.post<any>(`${environment.apiUrl}/auth/changepassword`, user);
  }

  doLogout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
    this.currentUser=null;
  }


}
