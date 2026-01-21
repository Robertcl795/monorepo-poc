import { Routes } from '@angular/router';
import { ChallengerLayoutComponent } from './challenger-layout.component';
import { InboxComponent } from './inbox.component';
import { WeekViewComponent } from './week-view.component';

export const REMOTE_ROUTES: Routes = [
  {
    path: '',
    component: ChallengerLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'week/today' },
      { path: 'week/:date', component: WeekViewComponent },
      { path: 'inbox', component: InboxComponent },
    ],
  },
];
