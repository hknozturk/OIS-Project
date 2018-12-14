import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** Components */
import { LoginComponent } from './components/login/login.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AuthGuard } from './auth/auth.guard';
import { PublicComponent } from './components/public/public.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SymptomsComponent } from './components/symptoms/symptoms.component';
import { DiseasesComponent } from './components/diseases/diseases.component';
import { SparqlConsoleComponent } from './components/sparql-console/sparql-console.component';

const routes: Routes = [
  { path: 'public', component: PublicComponent },
  { path: 'symptoms', component: SymptomsComponent },
  { path: 'diseases', component: DiseasesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'sparql', component: SparqlConsoleComponent },
  { path: 'profile', component: UserPageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'public', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
