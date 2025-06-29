import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Footer',
  templateUrl: './Footer.component.html'
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

add ( x:number , y :number ): number {
    return x + y;
  }
multiply ( x:number , y :number ): number {
    return x * y;
  }

}
