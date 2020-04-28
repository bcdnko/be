import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BibleComponent } from './bible/bible.component';
import { BibleChapterComponent } from './chapter/bible-chapter.component';
import { BibleIndexComponent } from './index/bible-index.component';

import { config } from '../config';

const routes: Routes = [
  {
    path: 'bible',
    component: BibleComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: `${config.defaultVersionId}`,
      },
      {
        path: ':versionId',
        component: BibleIndexComponent,
      },
      {
        path: ':versionId/:bookId',
        redirectTo: ':versionId/:bookId/1',
      },
      {
        path: ':versionId/:bookId/:chapter',
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
