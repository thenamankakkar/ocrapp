import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest,HttpClientModule, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient,private router: Router,private authService : AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      // Handle login logic here
      console.log('Login data:', loginData);



      this.http.post<any>(`http://localhost:3000/api/auth/login`, loginData, {
        reportProgress: true, // Report upload progress
        headers: new HttpHeaders() // Optional
      }).pipe(
        catchError(this.handleError) // Add catchError operator
      ).subscribe({
        next: (res) => {
          alert("login Sucessfull")
          this.authService.login()
          this.router.navigate(['/home']);
          console.log('Success:', res);
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });


    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
