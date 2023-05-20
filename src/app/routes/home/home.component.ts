import {Component, OnInit} from '@angular/core';
import { environment } from '../../../environments/environment';

declare var particlesJS: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  layout = environment.layout;

  ngOnInit(): void {
    particlesJS.load('particles-js', '../../../assets/particlesjs-config.json', null);
  }

  scrollToElement($element: Element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
