import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
      private notifyService: MatSnackBar
  ) { }

  show(message: string, closeMessage = "Fechar", duration = 4000) {
    this.notifyService.open(message, closeMessage, {
      duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }

  notify(message: string, closeMessage = "Fechar", duration = 4000) {
    this.notifyService.open(message, closeMessage, {
      duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'left'
    });
  }
}
