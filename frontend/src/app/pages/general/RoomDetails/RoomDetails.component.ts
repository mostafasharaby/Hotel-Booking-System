import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ReloadService } from '../../../shared/service/reload.service';
import { ActivatedRoute } from '@angular/router';
import { RoomApiService } from '../Room/room-service/room-api.service';
import { Room } from '../../booking/cart/cart-model/cart';
import { CartService } from '../../booking/cart/cart-service/cart.service';


@Component({
  selector: 'app-RoomDetails',
  templateUrl: './RoomDetails.component.html',
  styleUrls: ['./RoomDetails.component.css']
})
export class RoomDetailsComponent implements OnInit , AfterViewInit{

 
  constructor(private reload : ReloadService ,
              private route: ActivatedRoute , 
              private roomService :RoomApiService ,
              private cartService :CartService) { }
  ngAfterViewInit(): void {   
    this.reload.initializeLoader();
  }
  roomId:number = 0;
  room : any = {};
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.roomId = +params.get('roomId')!;
      console.log("params " ,this.roomId);
    });

    this.roomService.getRoomById(this.roomId).subscribe(item => {
      this.room = item;
      //console.log("details " + JSON.stringify(item, null, 2));
    },(error) => {      
        console.error('Error fetching product:', error);
      });
  }


  bookNow(room: Room): void {
    //console.log('Booking room:', room);
    this.cartService.addCartItem2(room);
  }


}
