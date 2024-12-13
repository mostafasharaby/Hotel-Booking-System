import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReloadService } from './shared/service/reload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Hotel Booking';
  showHeaderAndNavbar: boolean = true;
  constructor(private router: Router ,
    private reload : ReloadService
  ) { }


  ngAfterViewInit(): void {   
    this.reload.initializeLoader();
  }
  
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.showHeaderAndNavbar = !this.router.url.includes('/admin') && !this.router.url.includes('/error') && !this.router.url.includes('/auth');
    });
  }
  
}
