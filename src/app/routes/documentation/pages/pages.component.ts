import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DocumentationService} from "../../../shared/services/documentation/documentation.service";
import {ClipboardButtonComponent} from "../../../shared/components/clipboard-button/clipboard-button.component";

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

    readonly clipboardButton = ClipboardButtonComponent;

    post!: string;
    href!: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private docService: DocumentationService) {
    }

    ngOnInit(): void {
        this.route.params.subscribe({
            next: (params) => {

                const articleName = params['page'];

                this.docService.set(articleName);

                this.post = './assets/docs/' + articleName + '.md';
                this.href = window.location.href;
            },
            error: async () => await this.goHome(),
        });
    }

    async goHome() {
        await this.router.navigateByUrl('/home');
    }
}
