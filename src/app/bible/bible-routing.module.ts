import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BibleComponent } from './bible/bible.component';
import { BibleIndexComponent } from './index/bible-index.component';
import { BibleChapterComponent } from './chapter/bible-chapter.component';

const routes: Routes = [
  {
    path: 'bible',
    component: BibleComponent,
    children: [
      {
        path: 'books',
        component: BibleIndexComponent,
      },
      {
        path: ':versionId/books',
        component: BibleIndexComponent,
      },
      {
        path: ':versionId/:bookId',
        component: BibleChapterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibleRoutingModule { }
