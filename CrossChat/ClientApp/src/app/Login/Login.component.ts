import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-Login",
  templateUrl: "./Login.component.html",
  styleUrls: ["./Login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });

    if (localStorage.getItem("currentUser")) {
      this.authService.doLogout();
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  tryLogin() {
    this.loading = true;
    const value = {
      Username: this.f.username.value,
      Password: this.f.password.value,
    };

    this.authService.doLogin(value).subscribe(
      res => {
        this.router.navigate(["/chat"]);
      },
      err => {
        this.toastr.error('Login Failed', 'Error');
        this.loading = false;
        this.loginForm.reset();
      }
    );
  }
}
