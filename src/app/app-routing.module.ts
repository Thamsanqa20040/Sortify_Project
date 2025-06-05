import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then(m => m.ReportPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'my-reports',
    loadChildren: () => import('./my-reports/my-reports.module').then(m => m.MyReportsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'complete-profile',
    loadChildren: () => import('./complete-profile/complete-profile.module').then( m => m.CompleteProfilePageModule)
  },
  {
    path: 'rewards',
    loadChildren: () => import('./rewards/rewards.module').then( m => m.RewardsPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./admin/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'manage-users',
    loadChildren: () => import('./admin/manage-users/manage-users.module').then( m => m.ManageUsersPageModule)
  },
  {
    path: 'manage-rewards',
    loadChildren: () => import('./admin/manage-rewards/manage-rewards.module').then( m => m.ManageRewardsPageModule)
  },
  {
    path: 'manage-reports',
    loadChildren: () => import('./admin/manage-reports/manage-reports.module').then( m => m.ManageReportsPageModule)
  },
  {
    path: 'manage-sites',
    loadChildren: () => import('./admin/manage-sites/manage-sites.module').then( m => m.ManageSitesPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },   {
    path: 'recycling-centers',
    loadChildren: () => import('./recycling-centers/recycling-centers.module').then( m => m.RecyclingCentersPageModule)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  /*{
    path: 'recycling-business',
    loadChildren: () => import('./recycling-business/recycling-business.module').then( m => m.RecyclingBusinessPageModule)
  },*/


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
