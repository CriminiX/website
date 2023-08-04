import { Component } from '@angular/core';
import {ToastService} from "../../services/toast/toast.service";

@Component({
  selector: 'app-clipboard-button',
  templateUrl: './clipboard-button.component.html',
  styleUrls: ['./clipboard-button.component.scss']
})
export class ClipboardButtonComponent {

  constructor(
      private toastService: ToastService,
  ) {}

  onClick() {
    this.toastService.show("Copiado para a área de transferência.", "Fechar", 1000);
  }
}
