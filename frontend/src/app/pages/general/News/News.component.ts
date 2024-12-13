import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ReloadService } from '../../../shared/service/reload.service';


@Component({
  selector: 'app-News',
  templateUrl: './News.component.html',
  styleUrls: ['./News.component.css']
})
export class NewsComponent implements OnInit , AfterViewInit {

  constructor(private reload : ReloadService) { }
  ngAfterViewInit(): void {   
    this.reload.initializeLoader();
  }
  
  ngOnInit() {
  }

}
