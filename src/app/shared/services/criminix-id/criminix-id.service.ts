import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {CacheService} from "../cache/cache.service";
import {CriminixId} from "../../models/criminix-id";
import {v4 as uuid} from "uuid";

@Injectable({
  providedIn: 'root'
})
export class CriminixIdService {

  constructor(
      private cacheService: CacheService
  ) { }

  get(): string {
    const criminixId = this.cacheService.getLocal<CriminixId>('Criminix-Id');

    if (criminixId === undefined) {
      return this.generate();
    }

    return criminixId!.id;
  }

  generate() {
    const criminixId = this.cacheService.getLocal<CriminixId>('Criminix-Id');

    if (criminixId !== undefined) {
      return criminixId.id;
    }

    let id = uuid();

    if (!environment.isProd) {
      id = "DEV";
    }

    this.cacheService.saveLocal<CriminixId>('Criminix-Id', {
      id,
      created: new Date()
    });

    return id;
  }
}
