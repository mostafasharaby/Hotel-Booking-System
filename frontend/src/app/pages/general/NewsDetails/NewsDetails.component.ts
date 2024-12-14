import { Component, OnInit } from '@angular/core';
import { ReloadService } from '../../../shared/service/reload.service';

@Component({
  selector: 'app-NewsDetails',
  templateUrl: './NewsDetails.component.html',
  styleUrls: ['./NewsDetails.component.css']
})
export class NewsDetailsComponent implements OnInit {

  constructor(private reload : ReloadService) { }
  ngAfterViewInit(): void {   
    this.reload.initializeLoader();
  }

  ngOnInit() {
  }

}
