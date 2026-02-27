import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { DashboardOverviewPage } from './pages/dashboard-overview/dashboard-overview.page';

export const DASHBOARD_ROUTES: Routes = [
  { path: '', component: DashboardOverviewPage, canActivate: [authGuard] },
];