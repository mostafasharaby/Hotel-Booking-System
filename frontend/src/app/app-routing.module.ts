import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/general/Home/Home.component';
import { ErrorPageComponent } from './pages/general/errorPage/errorPage.component';


const routes: Routes = [
  {
    path: '',component: HomeComponent, pathMatch: 'full'
  },
  {
    path: 'Home', component: HomeComponent // title: 'resolvedChildATitle'
  },
  // {
  //   path: 'admin', canActivate: [AdminGuard],
  //   loadChildren: () => import('./adminModule/AdminModule.module').then(m => m.AdminModule)
  // },
  {
    path: 'pages',
    loadChildren: () => import('./pages/general/general.module').then(m => m.GeneralModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./pages/booking/booking.module').then(m => m.BookingModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'error', component: ErrorPageComponent,
    data: {
      type: 404,
      title: 'Page Not Found',
      desc: "Oopps!! The page you were looking for doesn't exist.",
    },
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent,
  },
  {
    path: '**', redirectTo: 'error', pathMatch: 'full'
  }

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
