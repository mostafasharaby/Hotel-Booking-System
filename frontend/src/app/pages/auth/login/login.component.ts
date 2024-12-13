import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnakebarService } from '../../../shared/service/SnakebarService.service';
import { ReloadService } from '../../../shared/service/reload.service';
import { AuthServiceService } from '../auth-services/auth-service.service';
import { ForgotServiceService } from '../forgetPassword/forgetPassword-service/forgot-service.service';
import { BehaviorSubject } from 'rxjs';
import { ResetPasswordService } from '../reset-password/reset-password-service/resetPassword.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit{

  
  ngOnInit() {
  }

   loginForm: FormGroup;
  constructor(private fb: FormBuilder,
    private reload : ReloadService,
    private authService: AuthServiceService,
    private router: Router,
    private snackBar: SnakebarService,
    private forgetpasswordService :ForgotServiceService, 
    private resetPasswordService :ResetPasswordService,
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.forgetForm = this.fb.group({
      emailForgot: ['', [Validators.required, Validators.email]],     
    });

    this.resetForm = this.fb.group({
      resetPassword: ['', [Validators.required]],     
    });
  }

  ngAfterViewInit(): void {   
    this.reload.initializeLoader();
  }
  

  isDialogOpen = false;
  isDialogMounted = false;

  openDialog(): void {
    this.isDialogOpen = true;
    setTimeout(() => {
      this.isDialogMounted = true;
    }, 10);
  }

  closeDialog(): void {
    this.isDialogMounted = false;
    setTimeout(() => {
      this.isDialogOpen = false;
    }, 200);
  }

  confirm(): void {
    // Handle confirm logic here
    console.log('Confirmed');
    this.closeDialog();
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  getEmailErrorMessage() {
    if (this.email?.hasError('required')) return 'Email is required.';
    //if (this.email?.hasError('email')) return 'Invalid email format.';
    return '';
  }

  getPasswordErrorMessage() {
    if (this.password?.hasError('required')) return 'Password is required.';
    if (this.password?.hasError('minlength')) return 'Password must be at least 6 characters.';
    return '';
  }

  onLoginSuccess() {
    this.snackBar.showSnakeBar(`Welcome ${this.authService.getUsernameFromToken()?.toUpperCase()}`);
  }
  onLoginFailed() {
    this.snackBar.showSnakeBar('Login Failed');
  }

  errorMessage: string | null = null; 
  onSubmit() {
    const { email, password } = this.loginForm.value;
      console.log("login val : " + email, password);
    if (this.loginForm.valid) {         
      this.authService.login(email, password).subscribe(
        (response: any) => {          
          this.onLoginSuccess();
          // if (this.authService.isAdmin()) {
          //   this.router.navigate(['admin/dashboard']);  
          //   console.log("admin");
          // } else {
            this.router.navigate(['/pages/home']);  
            console.log("user");
          //}
        },
        (error: any) => {
          console.error('Login failed', error);
          this.errorMessage = 'Email or password is incorrect';
          this.onLoginFailed();
        }
      );
    }
  }
// -------------------------------------------------------Forget password---------


forgetForm !: FormGroup;
get Forgotemail() {
  return this.forgetForm.get('emailForgot');
}
onForgotSubmit() {
  const emailForgetVal = this.forgetForm.value.emailForgot;
  console.log("emailForgot",emailForgetVal);
  this.forgetpasswordService.forgetPassword(emailForgetVal).subscribe({
    next: (res) => {
      alert(`Success: ${res.message}`)      
    },
    error: (err) => alert(`Errorrrr: ${err.error.message}`)
  });
  
}

// -------------------------------------------------------Reset password---------

resetForm !: FormGroup;
get resetPass() {
  return this.forgetForm.get('resetPassword');
}
onResetSubmit() {
  // const reset = this.resetForm.value.resetPassword;
  // console.log("resetPassword",reset);
  // this.resetPasswordService.forgetPassword(reset).subscribe({
  //   next: (res) => {
  //     alert(`Success: ${res.message}`),
  //     this.isResetMode$.next(false);
  //   },
  //   error: (err) => alert(`Errorrrr: ${err.error.message}`)
  // });
  
}

}
