import {Component, OnInit} from '@angular/core';
import docsJson from '../../../assets/docs/docs.json';
import {DocumentationConfigModel} from "../../shared/models/documentation-config";

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss']
})
export class DocumentationComponent implements OnInit {

  docs!: DocumentationConfigModel;

  ngOnInit(): void {
    this.docs = docsJson as DocumentationConfigModel;
  }

}
