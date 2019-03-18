import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrWizard } from '@clr/angular';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';
import { SignUpInfo } from 'src/app/auth/signup-info';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('wizard') wizard: ClrWizard;

  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  showSuccessAlert: boolean;
  showErrorAlert: boolean;
  loadingFlag: Boolean = false;
  openRegistrationWizard: Boolean = false;


  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  doCancel(): void {
    this.wizard.close();
}

  onSubmit(): void {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.firstname,
      this.form.lastname,
      this.form.username,
      this.form.email,
      this.form.password,
      this.form.SSN,
      this.form.nationality,
      this.form.birthDate,
      this.form.occupation,
      this.form.contact,
      this.form.emergencyContact,
      this.form.postalAddress,
      this.form.House_No,
      this.form.ApartmentName,
      this.form.rentBalance,
    );

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.showSuccessAlert = true;
        setTimeout(() => {
          if (this.showSuccessAlert) {
            this.showSuccessAlert = false;
            this.loadingFlag = true;
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
