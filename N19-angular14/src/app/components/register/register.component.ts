import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  model: any = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: '',
    phone: 0,
    dob: '',
  };

  confirmPassword = '';
  error: string | null = null;
  success: string | null = null;

  onSubmit() {
    this.authService.register(this.model).subscribe(
      (data: any) => {
        this.success = `User registered successfully.`;
        this.error = null;
      },
      (err: any) => {
        this.error = err.error?.message || 'Registration failed.';
        this.success = null;
      }
    );
  }

  resetFormModel() {
    this.model = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      gender: '',
      phone: 0,
      dob: '',
    };
  }
}
