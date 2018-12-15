import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DataServiceService } from './services/data-service.service';
import { SparqlService } from './services/sparql.service';
import { UserPageComponent } from './components/user-page/user-page.component';
import { PublicComponent } from './components/public/public.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SymptomsComponent } from './components/symptoms/symptoms.component';
import { DiseasesComponent } from './components/diseases/diseases.component';
import { TitlebarComponent } from './views/titlebar/titlebar.component';
import { SearchPipe } from './pipes/search.pipe';
import { SparqlConsoleComponent } from './components/sparql-console/sparql-console.component';
import { RemoveSpacePipe } from './pipes/remove-space.pipe';
import { ResultsComponent } from './components/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserPageComponent,
    PublicComponent,
    RegistrationComponent,
    SymptomsComponent,
    DiseasesComponent,
    SparqlConsoleComponent,
    TitlebarComponent,
    SearchPipe,
    RemoveSpacePipe,
    ResultsComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [DataServiceService, SparqlService],
  bootstrap: [AppComponent]
})
export class AppModule {}
