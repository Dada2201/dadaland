import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators'
import { StatusService } from '../shared/status.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({

  selector: 'app-repo-result',
  templateUrl: './repo-result.component.html',
  styleUrls: ['./repo-result.component.scss']
})
export class RepoResultComponent implements OnInit {
  apiStatus: any;
  randomrepo: any;
  panelOpenState: boolean = false;

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

  togglePanel() {
    if(this.panelOpenState == true){
      this.panelOpenState = !this.panelOpenState
    }

  }

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

  buildReadMe() : string{
    // Example of README url : https://raw.githubusercontent.com/LumingSun/ML4DB-paper-list/master/README.md
    return "https://raw.githubusercontent.com/"+this.randomrepo[0].full_name+"/master/README.md"
  }
} 