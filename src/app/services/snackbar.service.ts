import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }
  showNotification(displayMessage: string, buttonText: string, messageType: 'error' | 'success' | 'info') {
    this.snackBar.open(displayMessage, buttonText, {
      duration: 2000, horizontalPosition: 'center', verticalPosition: 'top', panelClass: messageType
    })
  }
}
