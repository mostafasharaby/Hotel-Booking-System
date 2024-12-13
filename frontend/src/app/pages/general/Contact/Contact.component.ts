import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReloadService } from '../../../shared/service/reload.service';

@Component({
  selector: 'app-Contact',
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.css']
})
export class ContactComponent implements OnInit , AfterViewInit {

  constructor(private reload : ReloadService , 
    private fb: FormBuilder
  ) { }
  ngAfterViewInit(): void {   
    this.reload.initializeLoader();
  }
  
  ngOnInit() {
    this.initForm();
  }
  contactForm!: FormGroup;
   get name() {
      return this.contactForm.get('name');
    }
    get email() {
      return this.contactForm.get('email');
    }
    get message() {
      return this.contactForm.get('message');
    }
 
  initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form submitted successfully!', this.contactForm.value);
      
    } else {
      console.error('Form is invalid!');
      this.contactForm.markAllAsTouched(); 
    }
  }
  

}
