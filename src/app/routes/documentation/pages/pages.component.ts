import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

    post!: string;
    href!: string;

    constructor(private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe({
            next: (params) => {

                const articleName = params['page'];

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
