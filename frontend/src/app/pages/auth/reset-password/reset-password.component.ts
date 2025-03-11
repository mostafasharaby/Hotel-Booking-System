import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from './reset-password-service/resetPassword.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnakebarService } from '../../../shared/service/SnakebarService.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  email: string = '';
  token: string = '';
  newPassword: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private resetPassordService: ResetPasswordService,
    private router: Router,
    private snakeBarService: SnakebarService
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.token = params['token'];
    });
    
  }




  // Submit form handler
  onSubmit(): void {
    if (this.resetForm.invalid) {
      this.snakeBarService.showSnakeBar('Please fill out the form correctly.');
      return;
    }

    const { newPassword, confirmPassword } = this.resetForm.value;

    console.log(this.email, this.token,newPassword, confirmPassword)
    if (newPassword !== confirmPassword) {
      this.snakeBarService.showSnakeBar('Passwords do not match!');
      return;
    }

    this.resetPassordService.resetPassword(this.email, this.token, newPassword)
      .subscribe({
        next: () => {
          this.snakeBarService.showSnakeBar('Password reset successful!');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.snakeBarService.showSnakeBar(`Error: ${err.error.message}`);
          console.error(err);
        }
      });
  }
  
}



