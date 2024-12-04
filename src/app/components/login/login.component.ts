import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const isLoggedIn = this.authService.login(this.username, this.password);
    if (isLoggedIn) {
      this.router.navigate(['/products']);  // Redirigir a la página de productos
    } else {
      this.errorMessage = 'Credenciales incorrectas';
    }
  }
}
