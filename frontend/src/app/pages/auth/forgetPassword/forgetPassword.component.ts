import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgetPassword',
  templateUrl: './forgetPassword.component.html'
})
export class ForgetPasswordComponent implements OnInit {



  ngOnInit() {
  }
  email: string = '';
  isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  onSubmit() {
    // Handle form submission logic here
    console.log('Password reset request for:', this.email);
  }

   
}




