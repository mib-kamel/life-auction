import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterComponent } from './enter/enter.component';
import { UserContentComponent } from './user-content/user-content.component';
import { ContentAuthGuard } from './content-auth-guard.service';
import { LoginAuthGuard } from './login-auth-guard.service';


export const routes: Routes = [
  { path: '', component: EnterComponent, canActivate: [LoginAuthGuard] },
  { path: 'user', component: UserContentComponent, canActivate: [ContentAuthGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
