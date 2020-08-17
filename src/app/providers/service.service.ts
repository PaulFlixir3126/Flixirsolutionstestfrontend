import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public serviceUrl = environment.serviceUrl;
  constructor(
    public http: HttpClient,
    public matSnackbar: MatSnackBar
  ) { }

  login(payload) {
    return this.http.post(this.serviceUrl + '/employee/login', payload);
  }

  register(payload) {
    return this.http.post(this.serviceUrl + '/employee', payload);
  }

  snackbar(message: string, duration?) {
    return this.matSnackbar.open(message, 'close', {
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      duration: duration || 2500,
      panelClass: ['snackbarStyle'],
    });
  }
}
