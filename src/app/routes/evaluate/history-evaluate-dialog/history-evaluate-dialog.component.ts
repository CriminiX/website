import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {EvaluateClientHistory, EvaluateClientHistoryModel} from "../../../shared/models/evaluate-client-history";
import {CacheService} from "../../../shared/services/cache/cache.service";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSort} from "@angular/material/sort";
import {fromId} from 'src/app/shared/models/shifts';
import {LocationsEvaluateClientForm} from "../../../shared/models/evaluate-client-form";
import { NgxMaskPipe } from 'ngx-mask';

@Component({
    selector: 'app-history-evaluate-dialog',
    templateUrl: './history-evaluate-dialog.component.html',
    styleUrls: ['./history-evaluate-dialog.component.scss']
})
export class HistoryEvaluateDialogComponent implements OnInit, AfterViewInit {

    hasData = true;
    dataTable!: MatTableDataSource<EvaluateClientHistory>;
    selection!: SelectionModel<EvaluateClientHistory>;

    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private dialogRef: MatDialogRef<HistoryEvaluateDialogComponent, EvaluateClientHistoryModel>,
        private cacheService: CacheService
    ) {
    }

    ngAfterViewInit() {
        if (this.hasData) {
            this.dataTable.sort = this.sort;
        }
    }

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        const data = this.cacheService.get<EvaluateClientHistory[]>("evaluate-history");
        this.selection = new SelectionModel<EvaluateClientHistory>(true, []);

        if (data === undefined || data.length === 0) {
            this.hasData = false;
            return;
        }

        this.dataTable = new MatTableDataSource(data);
    }

    confirm() {
        if (this.selection.selected.length !== 1) {
            return;
        }

        const data = this.selection.selected[0];

        this.dialogRef.close(data);
    }

    erase() {
        if (this.selection.selected.length === 0) {
            return;
        }

        const data = this.dataTable.data.filter(x => !this.selection.selected.find(y => x.id === y.id));

        this.cacheService.save("evaluate-history", data);

        const id = this.cacheService.get<string>("evaluate-form");

        if (id !== undefined && this.selection.selected.map(x => x.id).includes(id)) {
            this.cacheService.delete("evaluate-form");
            this.cacheService.delete("evaluate");
        }

        this.loadData();
    }


    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataTable.data.length;
        return numSelected === numRows;
    }

    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataTable.data);
    }

    getCepName(locations: LocationsEvaluateClientForm[]) {
        return locations.map(x => {
            if ((x.cep?.length || 0) == 8) {
                return x.cep!.replace(/(\d{5})(\d)/,'$1-$2');
            }

            return "N/A";
        }).join(', ');
    }

    getCityName(locations: LocationsEvaluateClientForm[]) {
        return locations.map(x => x.city).join(', ');
    }

    getNeighborhoodName(locations: LocationsEvaluateClientForm[]) {
        return locations.map(x => x.neighborhood).join(', ');
    }
}
