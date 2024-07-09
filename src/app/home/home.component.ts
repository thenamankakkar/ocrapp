import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest,HttpClientModule, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedFile: File | null = null;
  uploadProgress: number | undefined;
  uploadError: string | undefined;
  uploadSuccess: string | undefined;

  imgText ='';
  imgSrc = '';

  constructor(private http: HttpClient,private authService : AuthService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
    console.log("this.file",this.selectedFile)
  }

  onSubmit(event : any) {
    event.preventDefault();
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.http.post<any>(`http://localhost:3000/api/file`, formData, {
      reportProgress: true, // Report upload progress
      headers: new HttpHeaders() // Optional
    }).pipe(
      catchError(this.handleError) // Add catchError operator
    ).subscribe({
      next: (res) => {
        this.imgSrc = "data:image/png;base64,"+res.data.image;
        this.imgText= res.data.text;

        console.log('Success:', res);
      },
      error: (error) => {

        console.error('There was an error!', error);
      }
    });
    

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

  logout(){
    this.authService.logout();
  }

}