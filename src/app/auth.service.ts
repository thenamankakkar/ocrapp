// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedFlag = false;

  constructor() {}

  isAuthenticated(): boolean {
    return this.isAuthenticatedFlag;
  }

  login() {
    // Perform login logic, set isAuthenticatedFlag to true
    this.isAuthenticatedFlag = true;
  }

  logout() {
    // Perform logout logic, set isAuthenticatedFlag to false
    this.isAuthenticatedFlag = false;
  }
}
