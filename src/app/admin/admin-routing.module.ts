import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.page').then(m => m.DashboardPage) },
  { path: 'manage-users', loadChildren: () => import('./manage-users/manage-users.page').then(m => m.ManageUsersPage) },
  { path: 'manage-reports', loadChildren: () => import('./manage-reports/manage-reports.page').then(m => m.ManageReportsPage) },
  { path: 'manage-rewards', loadChildren: () => import('./manage-rewards/manage-rewards.page').then(m => m.ManageRewardsPage) },
  { path: 'manage-sites', loadChildren: () => import('./manage-sites/manage-sites.page').then(m => m.ManageSitesPage) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
