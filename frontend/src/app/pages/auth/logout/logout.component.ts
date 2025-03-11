import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-services/auth-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private authService: AuthServiceService) { }


  ngOnInit() {
  }
  confirmLogout(): void {
    console.log('Logging out...');
    this.authService.logout();
    // this.isLoggedOut= true;
    this.router.navigate(['/auth/login']);
  }
  //private logoutModal: Modal | undefined;

  cancelLogout(): void {
    console.log('Logout cancelled.');
    this.router.navigate(['/pages/home']);

  }

}
