import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      username: ["",  [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ["", [Validators.required,Validators.maxLength(16),Validators.minLength(6)]],
      repassword: ["", Validators.required],
    });

    if (localStorage.getItem("currentUser")) {
      this.authService.doLogout();
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  tryRegister(){

    this.loading = true;
    const value = {

      Name: this.f.name.value,
      Surname: this.f.surname.value,
      Email: this.f.username.value,
      Password: this.f.password.value,
    };

    this.authService.doRegister(value).subscribe(res=>{

      if(res){
        this.toastr.success('Register Success. Please login', 'Success');
        this.router.navigate(["/login"]);
      }

    },err=>{
        this.toastr.error('Register Failed', 'Error');
        this.loading = false;
    });
  }

}
