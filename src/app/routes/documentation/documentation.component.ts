import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import docsJson from '../../../assets/docs/docs.json';
import {DocumentationConfig, DocumentationConfigModel} from "../../shared/models/documentation-config";
import {MediaMatcher} from "@angular/cdk/layout";
import {ActivatedRoute} from "@angular/router";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTree, MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {DocumentationService} from "../../shared/services/documentation/documentation.service";

interface TreeNode {
    expandable: boolean;
    name: string;
    path?: string;
    level: number;
}

@Component({
    selector: 'app-documentation',
    templateUrl: './documentation.component.html',
    styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit, OnDestroy, AfterViewInit {

    mobileQuery: MediaQueryList;

    @ViewChild('tree') tree!: MatTree<DocumentationConfig>;

    private _transformer = (node: DocumentationConfig, level: number): TreeNode => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            path: node.path,
            level: level,
        };
    };

    treeControl = new FlatTreeControl<TreeNode>(
        node => node.level,
        node => node.expandable,
    );

    treeFlattener = new MatTreeFlattener(
        this._transformer,
        node => node.level,
        node => node.expandable,
        node => node.children,
    );

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    private _mobileQueryListener: () => void;

    docsFullPath: string[] = [];

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        private docService: DocumentationService
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 660px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        const docs = docsJson as DocumentationConfigModel;

        this.dataSource.data = docs;

        this.docService.get().subscribe({
            next: value => {
                this.setCurrentPageTitle(docs, value);
                this.changeDetectorRef.detectChanges();
            }
        });
    }

    ngAfterViewInit() {
        this.tree.treeControl.expandAll();
    }

    setCurrentPageTitle(docs: DocumentationConfigModel, path: string) {
        docs.forEach(firstDocs => {
            if (path === firstDocs.path) {
                this.docsFullPath = [firstDocs.name];
            }

            firstDocs.children?.forEach(secondDocs => {
                if (path === secondDocs.path) {
                    this.docsFullPath = [firstDocs.name, secondDocs.name];
                }

                secondDocs.children?.forEach(thirdDocs => {
                    if (path === thirdDocs.path) {
                        this.docsFullPath = [firstDocs.name, secondDocs.name, thirdDocs.name];
                    }
                });
            });
        });
    }

    hasChild = (_: number, node: TreeNode) => node.expandable;

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);

        this.docService.reset();
    }
}
