import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BibleIndexComponent } from './bible-index/bible-index.component';

const routes: Routes = [
  {
    path: 'bible/:versionId/books',
    component: BibleIndexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibleRoutingModule { }
