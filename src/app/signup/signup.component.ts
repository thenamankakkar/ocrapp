import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest,HttpClientModule, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient,private router: Router) {
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



      this.http.post<any>(`http://localhost:3000/api/auth/register`, loginData, {
        reportProgress: true, // Report upload progress
        headers: new HttpHeaders() // Optional
      }).pipe(
        catchError(this.handleError) // Add catchError operator
      ).subscribe({
        next: (res) => {
          alert("Signup Sucessfull")
          this.router.navigate(['/login']);
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