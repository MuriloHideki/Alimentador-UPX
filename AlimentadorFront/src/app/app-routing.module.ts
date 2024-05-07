import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FeedersListComponent } from './pages/feeder/feeders-list/feeders-list.component';
import { FeederDetailsComponent } from './pages/feeder/feeder-details/feeder-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'feeders', component:  FeedersListComponent},
  { path: 'feeder/:id', component: FeederDetailsComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
