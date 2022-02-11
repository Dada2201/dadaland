import { Component, OnInit } from '@angular/core';
import { StatusService } from '../shared/status.service';
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-repo-result',
  templateUrl: './repo-result.component.html',
  styleUrls: ['./repo-result.component.scss']
})
export class RepoResultComponent implements OnInit {
  apiStatus: any;
  randomrepo: any;

  constructor(private statusService: StatusService) { }

  ngOnInit(): void {
    this.statusService
      .getStatus()
      .subscribe((response: any) => {
        this.apiStatus = response;
      })
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
}