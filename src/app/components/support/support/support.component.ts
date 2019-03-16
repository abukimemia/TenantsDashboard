import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrDatagridStateInterface } from '@clr/angular';

import { UserService } from 'src/app/services/user.service';
import { SupportService } from 'src/app/services/support.service';
import { Support } from './../../../model/support';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  form: any = {};
  supports: any = [2];
  loading = true;
  showSuccessAlert: boolean;
  message: any;
  userInfo: any;
  description: any;

  supportForm: FormGroup;

  private supportInfo: Support;


  constructor(
    private supportService: SupportService,
    private userService: UserService
    ) {
    this.supportForm = new FormGroup({
      tckPriority: new FormControl('', Validators.required),
      tckStatus: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      ApartmentName: new FormControl('', Validators.required),
      House_No: new FormControl('', Validators.required),
    });
   }

  ngOnInit() {
    this.userService.getUserBoard().subscribe(data => {
      console.log(data.user.uuid);
      data = this.userInfo = {
        uuid: data.user.uuid
      };
    });
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;

    this.getSupport();
  }

  getSupport() {
    return this.supportService.getTckSupports().subscribe(data => {
      console.log(data);
      this.supports = data;
      this.loading = false;
    });
  }

  onSubmit() {
    console.log('button clicked', this.form);

    this.supportInfo = new Support (
      this.form.tckPriority,
      this.form.tckStatus,
      this.form.phone,
      this.form.description,
      this.form.ApartmentName,
      this.form.House_No,
      this.userInfo.uuid
    );
    this.supportService.submitTicket(this.supportInfo).subscribe(data => {
      this.showSuccessAlert = true;
      this.message = 'Submitted Successfully!';
      setTimeout(() => {
        if (this.showSuccessAlert) {
          this.showSuccessAlert = false;
          this.reloadPage();
        }
      },
        2500);
    });
  }

  resetForm() {
    this.supportForm.reset();
  }

  reloadPage() {
    window.location.reload();
  }

}
