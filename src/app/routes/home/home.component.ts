import {Component, OnInit} from '@angular/core';
import { environment } from '../../../environments/environment';
import {Clipboard} from "@angular/cdk/clipboard";
import {ToastService} from "../../shared/services/toast/toast.service";

declare var particlesJS: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
      private clipboard: Clipboard,
      private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    particlesJS.load('particles-js', '../../../assets/particlesjs-config.json', null);
  }

  scrollToElement($element: Element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  copyText(text: string) {
    this.clipboard.copy(text);
    this.toastService.show("Copiado para a área de transferência.")
  }
}
