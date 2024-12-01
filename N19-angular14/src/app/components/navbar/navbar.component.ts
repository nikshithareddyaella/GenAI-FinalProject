import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Subscribe to login state changes
    this.authService.loggedIn$.subscribe((state) => {
      this.loggedIn = state;
    });
  }

  // Logout function
  onLogout(): void {
    this.authService.logout();
  }
}
