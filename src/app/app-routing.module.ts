import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { AuthGuard } from './auth/auth.guard';
import { PublicComponent } from './components/public/public.component';

const routes: Routes = [
  { path: 'public', component: PublicComponent },
  { path: 'login', component: LoginComponent },
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
