import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BibleIndexComponent } from './index/bible-index.component';
import { BibleChapterComponent } from './chapter/bible-chapter.component';

const routes: Routes = [
  {
    path: 'bible/books',
    component: BibleIndexComponent,
  },
  {
    path: 'bible/:versionId/books',
    component: BibleIndexComponent,
  },
  {
    path: 'bible/:versionId/:bookId',
    component: BibleChapterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibleRoutingModule { }
