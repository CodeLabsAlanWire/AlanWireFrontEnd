import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-employee-docs',
  templateUrl: './employee-docs.component.html',
  styleUrls: ['./employee-docs.component.css']
})
export class EmployeeDocsComponent implements OnInit {

  selectedTopic: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  loadIframe(url: string) {
    this.selectedTopic = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


