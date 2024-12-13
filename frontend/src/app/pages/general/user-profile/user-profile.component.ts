import { Component, OnInit } from '@angular/core';
import { Profile } from './profile-model/profile';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnakebarService } from '../../../shared/service/SnakebarService.service';
import { ReloadService } from '../../../shared/service/reload.service';
import { Router } from '@angular/router';
import { ProfileService } from './profile-service/Profile.service';
import { AuthServiceService } from '../../auth/auth-services/auth-service.service';
import { ChangePasswordService } from './profile-service/change-password.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private profileService: ProfileService,
    private reload: ReloadService,
    private snakebar: SnakebarService,
    private router: Router,
    private changePasswordService :ChangePasswordService,
    private snakebarService :SnakebarService) { }

  ngOnInit() {
    //this.cartSubscription =
    this.initForm();
    this.getProfileDetails();
   // this.onSubmit();
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
    }, 150);
  }
  confirm(): void {
    console.log('Confirmed');
    this.closeDialog();
  }


  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';


  get userName() {
    return this.profileForm.get('userName');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get address() {
    return this.profileForm.get('address');
  }

  get coverImgUrl() {
    return this.profileForm.get('coverImgUrl');
  }
  get personalImgUrl() {
    return this.profileForm.get('personalImgUrl');
  }
  get phoneNumber() {
    return this.profileForm.get('phoneNumber');
  }

  get currentPassword() {
    return this.profileForm.get('userName');
  }

  get newPassword() {
    return this.profileForm.get('email');
  }

  get confirmPassword() {
    return this.profileForm.get('address');
  }


  profileData: Profile = {
    email: '',
    userName: '',
    phoneNumber: '',
    address:'',
    coverImgUrl: '',
    personalImgUrl: ''
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      userName: [''],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phoneNumber: [''],
      personalImgUrl: [''],
      coverImgUrl: ['']
    });


    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
    
  }


  getProfileDetails(): void {
    this.profileService.getProfileDetails2().subscribe({
      next: (profile) => {
        console.log('Profile fetched successfully:', profile);
        this.profileData = profile;
       this.profileForm.patchValue(profile);  // Populate form with fetched data
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
        this.snakebar.showSnakeBar('Error fetching profile details.');
      }
    });
  }

  onSubmit(): void {
    const profileInfo: Profile = this.profileForm.value;
    console.log('Form Submitted', profileInfo);

    this.profileService.updateProfileDetails(profileInfo).subscribe({
      next: (response) => {
        console.log('Profile updated successfully:', response);
        this.snakebar.showSnakeBar('Profile updated successfully!');
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.snakebar.showSnakeBar('Error updating profile.');
      }
    });
  }

  selectedImage: File | null = null;
    onImageChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedImage = target.files[0];
      console.log('Selected image:', this.selectedImage);
      this.profileData.personalImgUrl = '/img/'+this.selectedImage.name;
    }
  }





  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value ? null : { passwordMismatch: true };          
  }
  
  onChangePassword() {
    if (this.passwordForm.valid) {
      const model = {
        currentPassword: this.passwordForm.value.currentPassword,
        newPassword: this.passwordForm.value.newPassword,
      };
      console.log("model",model);
      this.changePasswordService.changePassword(model).subscribe({
        next: (response) => {
          this.successMessage = response;
          this.errorMessage = '';
          this.passwordForm.reset();
          console.log("success",this.successMessage);
          this.snakebarService.showSnakeBar("Password updated successfully");
        },
        error: (error) => {
          this.errorMessage = error.error?.description || 'An unexpected error occurred.';
          this.successMessage = '';
          console.error("Error:", this.errorMessage);
          this.snakebarService.showSnakeBar(`Error updating password: ${this.errorMessage}`);
          
        },
      });
    }
  }
  isDialogOpen2 = false;
  isDialogMounted2 = false;
  openDialog2(): void {
    this.isDialogOpen2 = true;
    setTimeout(() => {
      this.isDialogMounted2 = true;
    }, 10);
  }
  closeDialog2(): void {
    this.isDialogMounted2 = false;
    setTimeout(() => {
      this.isDialogOpen2 = false;
    }, 150);
  }

  

}
