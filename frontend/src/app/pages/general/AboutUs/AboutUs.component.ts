import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ReloadService } from '../../../shared/service/reload.service';


@Component({
  selector: 'app-AboutUs',
  templateUrl: './AboutUs.component.html',
  styleUrls: ['./AboutUs.component.css']
})
export class AboutUsComponent implements OnInit , AfterViewInit {

  constructor(private reload : ReloadService) { }
  ngAfterViewInit(): void {   
    this.reload.initializeLoader();
  }

  ngOnInit() {
  }

}
