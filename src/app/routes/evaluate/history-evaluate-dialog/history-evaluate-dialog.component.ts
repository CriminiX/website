import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {EvaluateClientHistory, EvaluateClientHistoryModel} from "../../../shared/models/evaluate-client-history";
import {CacheService} from "../../../shared/services/cache/cache.service";

@Component({
    selector: 'app-history-evaluate-dialog',
    templateUrl: './history-evaluate-dialog.component.html',
    styleUrls: ['./history-evaluate-dialog.component.scss']
})
export class HistoryEvaluateDialogComponent implements OnInit {

    data?: EvaluateClientHistory[];
    indexHistory?: number;

    constructor(
        private dialogRef: MatDialogRef<HistoryEvaluateDialogComponent, EvaluateClientHistoryModel>,
        private cacheService: CacheService
    ) {
    }

    ngOnInit(): void {
        this.loadData();
    }

    loadData() {
        this.data = this.cacheService.get<EvaluateClientHistory[]>("evaluate-history");
    }

    confirm() {
        if (this.indexHistory === undefined) {
            this.dialogRef.close(undefined);
            return;
        }

        const data = this.data?.at(this.indexHistory);
        this.dialogRef.close(data);
    }

    erase() {
        if (this.indexHistory === undefined) {
            return;
        }

        this.cacheService.removeOnList("evaluate-history", this.indexHistory);
        this.loadData();
    }
}
