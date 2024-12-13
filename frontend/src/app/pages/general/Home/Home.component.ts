import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ReloadService } from '../../../shared/service/reload.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements  AfterViewInit {

  constructor(private reload : ReloadService) { }

  ngAfterViewInit(): void {   
    this.reload.initializeLoader();
  }

 

}
