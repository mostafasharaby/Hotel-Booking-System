import { Component, OnInit } from '@angular/core';
import { ReloadService } from '../../../shared/service/reload.service';


@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {

  constructor(private reload : ReloadService) { }
  ngAfterViewInit(): void {   
    this.reload.initializeLoader();
  }

  ngOnInit() {
  }

}
