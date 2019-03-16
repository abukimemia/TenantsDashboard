import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';
import { SignUpInfo } from 'src/app/auth/signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  showSuccessAlert: boolean;
  showErrorAlert: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.firstname,
      this.form.lastname,
      this.form.username,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.showSuccessAlert = true;
        setTimeout(() => {
          if (this.showSuccessAlert) {
            this.showSuccessAlert = false;
            this.router.navigate(['/auth/login']);
          }
        }, 2500);
      },
      error => {
        console.log(error);
        this.showErrorAlert = true;
        this.errorMessage = error.error;
        setTimeout(() => {
          if (this.showErrorAlert) {
            this.showErrorAlert = false;
          }
        }, 2500);
      }
    );
  }
}
