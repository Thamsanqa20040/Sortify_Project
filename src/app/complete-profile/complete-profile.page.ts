import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.page.html',
  styleUrls: ['./complete-profile.page.scss'],
  standalone: false,
})
export class CompleteProfilePage implements OnInit {
  profileForm!: FormGroup; // non-null assertion added here

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.profileForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      profilePicture: [null],
    });
  }
  selectedGender: string = 'Male';

selectGender(gender: string) {
  this.selectedGender = gender;
}


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.profileForm.patchValue({ profilePicture: file });
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log('Profile Data:', this.profileForm.value);
      // Handle the form data here (e.g., send to API)
    }
  }
}
