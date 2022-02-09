import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RepoResultComponent } from './repo-result/repo-result.component';

const routes: Routes = [
  { path: '', redirectTo: 'AppComponent' , pathMatch: 'full'},
  { path: 'repos', component: RepoResultComponent }
  // TODO page not found !
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
