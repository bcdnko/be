import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { config } from './config';

const routes: Routes = [
  {
    path: '',
    redirectTo: `bible/${config.defaultVersionId}`,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
