import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './AboutUs/AboutUs.component';
import { ContactComponent } from './Contact/Contact.component';
import { HomeComponent } from './Home/Home.component';
import { NewsComponent } from './News/News.component';
import { RoomComponent } from './Room/Room.component';
import { RoomDetailsComponent } from './RoomDetails/RoomDetails.component';
import { FilterComponent } from './filter/filter.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NewsDetailsComponent } from './NewsDetails/NewsDetails.component';


const routes: Routes = [

  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'home', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news-details', component: NewsDetailsComponent },
  { path: 'rooms', component: RoomComponent },
  { path: 'room-details/:roomId', component: RoomDetailsComponent },
  { path: 'profile', component: UserProfileComponent },
]

@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    RouterModule,
    FormsModule 
  ],
  declarations: [
    GeneralComponent,
    AboutUsComponent,
    ContactComponent,
    HomeComponent,
    RoomComponent,
    NewsComponent,
    NewsDetailsComponent,
    RoomDetailsComponent,
    FilterComponent,
    UserProfileComponent
  ]
})
export class GeneralModule { }
