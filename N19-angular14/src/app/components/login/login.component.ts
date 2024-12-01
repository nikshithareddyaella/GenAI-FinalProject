import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, LoginModel } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMsg: string | null = null;

  model: LoginModel = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authService.login(this.model).subscribe(
      (response) => {
        console.log(response);
        console.log('Login successful');
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        console.log(err);
        this.errorMsg = err.error?.message || 'Invalid Credentials';
      }
    );
  }

  onClickOfRegister() {
    this.router.navigate(['/register']);
  }
}


