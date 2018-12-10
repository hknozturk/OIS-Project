import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DataServiceService } from './services/data-service.service';
import { UserPageComponent } from './components/user-page/user-page.component';
import { PublicComponent } from './components/public/public.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SparqlConsoleComponent } from './components/sparql-console/sparql-console.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, UserPageComponent, PublicComponent, RegistrationComponent, SparqlConsoleComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
