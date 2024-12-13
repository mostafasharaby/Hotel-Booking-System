import { Component, HostListener, OnInit } from '@angular/core';
import { AuthServiceService } from '../../pages/auth/auth-services/auth-service.service';
import { Router } from '@angular/router';
import { CartService } from '../../pages/booking/cart/cart-service/cart.service';
import { ProfileService } from '../../pages/general/user-profile/profile-service/Profile.service';
import { MENU } from '../menu/menu';


@Component({
  selector: 'app-NavBar',
  templateUrl: './NavBar.component.html',
  styleUrls: ['./NavBar.component.css']
})
export class NavBarComponent implements OnInit {
  nOfItems?:number = 0;
  constructor(private authService :AuthServiceService , 
              private router : Router,
              private cartService : CartService,
              private profileService :ProfileService
  ) { 
   
    this.cartService.cartItems$.subscribe(items => {
      this.nOfItems =  items?.length ;    
       console.log( "nOfItems in navebar " + this.nOfItems);
    });

  }

  menulist: { title: string; path: string }[] = MENU;

  
  isLoggedIn = true;
  ngOnInit() {
    this.authService.getloggedStatus().subscribe(status => {
      this.isLoggedIn = status;
    });
    this.getProfileImage();
  }



  isDrawerOpen = false;
  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  } 
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  
  confirmLogout(): void {
    console.log('Logging out...');    
    this.authService.logout();     
    this.router.navigate(['/auth/login']).then(() => {
      window.location.reload();
    });
  }

  cancelLogout(): void {
    console.log('Logout cancelled.');
    this.router.navigate(['/pages/home']);
  }



  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = (event.target as Window).innerWidth;
    if (width >= 768) {
      this.isDrawerOpen = false;
    }
  }

  profileImage: string='';
  getProfileImage(): void {
    this.profileService.getProfileDetails2().subscribe({
      next: (profile) => {
        console.log('Profile fetched successfully:', profile.personalImgUrl);
        this.profileImage = profile.personalImgUrl;       
      },
      error: (error) => {
        console.error('Error fetching profile:', error);        
      }
    });
  }

  
}
