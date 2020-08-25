// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
// Auth
import { AuthGuard } from './core/auth';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)},
  { path: 'error', loadChildren: () => import('./views/pages/error/error.module').then(m => m.ErrorModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'cms',
        loadChildren: () => import('./views/pages/cms/cms.module').then(m => m.CMSModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/pages/user-profile/user-profile.module').then(m => m.UserProfileModule),
      },
      {
        path: 'health-profile',
        loadChildren: () => import('./views/pages/health-profile/health-profile.module').then(m => m.HealthProfileModule),
      },
      {
        path: 'home',
        loadChildren: () => import('./views/pages/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'mail',
        loadChildren: () => import('./views/pages/apps/mail/mail.module').then(m => m.MailModule),
      },
      {
        path: 'ecommerce',
        loadChildren: () => import('./views/pages/apps/e-commerce/e-commerce.module').then(m => m.ECommerceModule),
      },
      {
        path: 'ngbootstrap',
        loadChildren: () => import('./views/pages/ngbootstrap/ngbootstrap.module').then(m => m.NgbootstrapModule),
      },
      {
        path: 'material',
        loadChildren: () => import('./views/pages/material/material.module').then(m => m.MaterialModule),
      },
      {
        path: 'user-management',
        loadChildren: () => import('./views/pages/user-management/user-management.module').then(m => m.UserManagementModule),
      },
      {
        path: 'wizard',
        loadChildren: () => import('./views/pages/wizard/wizard.module').then(m => m.WizardModule),
      },
      {
        path: 'builder',
        loadChildren: () => import('./views/theme/content/builder/builder.module').then(m => m.BuilderModule),
      },
      {path: '', redirectTo: 'profile', pathMatch: 'full'},
      {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
    ],
  },
  {path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
