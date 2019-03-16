import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  title = 'ECS Dashboard';

  info: any;
  isLoggedIn = false;
  loggedInUser: string;

constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.loggedInUser = this.tokenStorage.getUsername();
    } else {
      this.isLoggedIn = false;
    }
  }

  logOut() {
    this.tokenStorage.signOut();
    this.router.navigate(['/auth/login']);
    this.isLoggedIn = false;
  }

}
