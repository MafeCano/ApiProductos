import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor() { }

  login(username: string, password: string): boolean {
    if (username === 'user' && password === 'password') { // Validación simple (puedes modificarla)
      this.isAuthenticated.next(true);  // Cambia el estado a 'autenticado'
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated.next(false);  // Cambia el estado a 'no autenticado'
  }

  get isUserAuthenticated() {
    return this.isAuthenticated.asObservable();
  }
}
