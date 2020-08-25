import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isLoggedIn$: Observable<User>; 
  isExpanded = false;
  constructor(private authService: AuthService){
  
     
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.currentUser; // {2}
  }




  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logOut(){
    this.isLoggedIn$ = null;
    this.authService.doLogout();
  }


}
