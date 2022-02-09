import { Component, OnInit } from '@angular/core';
import { StatusService } from '../shared/status.service';

@Component({
  selector: 'app-repo-result',
  templateUrl: './repo-result.component.html',
  styleUrls: ['./repo-result.component.scss']
})
export class RepoResultComponent implements OnInit {
  apiStatus: any;
  randomrepo: any;

  constructor(private statusService: StatusService) {}
  
  ngOnInit(): void {
    this.statusService
      .getStatus()
      .subscribe((response: any) => {
        this.apiStatus = response;
      });

      this.statusService
      .getRepo()
      .subscribe((response: any) => {
        this.randomrepo = response[0];
      });
  }

  get status() { return (this.apiStatus && this.apiStatus.status) ? this.apiStatus.status : null }

  get repo() { return (this.randomrepo && this.randomrepo.github_url) ? this.randomrepo.github_url : null }
}
