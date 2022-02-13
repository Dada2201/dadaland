import { Component, OnInit } from '@angular/core';
import { StatusService } from '../shared/status.service';
import { first } from 'rxjs/operators'
import { DomSanitizer } from '@angular/platform-browser';

@Component({

  selector: 'app-repo-result',
  templateUrl: './repo-result.component.html',
  styleUrls: ['./repo-result.component.scss']
})
export class RepoResultComponent implements OnInit {
  apiStatus: any;
  randomrepo: any;

  constructor(
    private statusService: StatusService,
    private sanitazer : DomSanitizer) {
   }
  
  ngOnInit(): void {
    this.statusService
      .getStatus()
      .subscribe((response: any) => {
        this.apiStatus = response;
      })

      this.randomRepo()
  }

  get status() { return (this.apiStatus && this.apiStatus.status) ? this.apiStatus.status : null }

  randomRepo() {
    this.statusService
      .getRepo()
      .pipe(first())
      .subscribe(
        res => {
          this.randomrepo = res
        })
  }

  getAvatar(url : string) {
    return this.sanitazer.bypassSecurityTrustResourceUrl(url);
  }
}