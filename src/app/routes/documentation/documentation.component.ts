import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import docsJson from '../../../assets/docs/docs.json';
import {DocumentationConfig, DocumentationConfigModel} from "../../shared/models/documentation-config";
import {MediaMatcher} from "@angular/cdk/layout";
import {ActivatedRoute} from "@angular/router";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTree, MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";

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

    constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, private route: ActivatedRoute) {
        this.mobileQuery = media.matchMedia('(max-width: 660px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        const docs = docsJson as DocumentationConfigModel;
        console.log(docs);
        this.dataSource.data = docs;
    }

    ngAfterViewInit() {
        this.tree.treeControl.expandAll();
    }

    hasChild = (_: number, node: TreeNode) => node.expandable;

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
