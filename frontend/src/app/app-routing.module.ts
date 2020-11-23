import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoteComponent } from './vote/vote.component';

const routes: Routes = [
  {
    path: 'vote',
    loadChildren: () => import('./vote/vote.module').then((m) => m.VoteModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', redirectTo: '/vote', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
