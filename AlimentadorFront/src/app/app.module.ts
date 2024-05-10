import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FeedersListComponent } from './pages/feeder/feeders-list/feeders-list.component';
import { FeederDetailsComponent } from './pages/feeder/feeder-details/feeder-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationDialogComponent } from './pages/aux/confirmation-dialog/confirmation-dialog.component';
import { FormatKgPipe } from './pipe/format-kg.pipe';
import { NavbarComponent } from './pages/aux/navbar/navbar.component';
import { FeederFormComponent } from './pages/feeder/feeder-form/feeder-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedersListComponent,
    FeederDetailsComponent,
    ConfirmationDialogComponent,
    FormatKgPipe,
    NavbarComponent,
    FeederFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
