import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * HTTP Interceptor for handling authentication and error logging
 * Adds Authorization header if auth token is available
 * Logs all HTTP errors to the console
 */
export const httpInterceptor: HttpInterceptorFn = (request, next) => {
  // Add auth token if available
  const authToken = localStorage.getItem('auth_token');
  
  if (authToken) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }

  // Add content-type header if not present
  if (!request.headers.has('Content-Type')) {
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Handle the request and catch any errors
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error);
      
      // You can add more sophisticated error handling here
      let errorMessage = 'An error occurred';
      
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      
      return throwError(() => new Error(errorMessage));
    })
  );
};
