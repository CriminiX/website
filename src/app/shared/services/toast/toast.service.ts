import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private closeMessage = 'Fechar';

  constructor(
      private notifyService: MatSnackBar
  ) { }

  show(message: string, closeMessage?: string) {
    this.notifyService.open(message, closeMessage ?? this.closeMessage, {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}
