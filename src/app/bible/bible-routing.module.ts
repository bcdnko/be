import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from '../error/page-not-found/page-not-found.component';

import { BibleComponent } from './bible/bible.component';
import { BibleChapterComponent } from './chapter/bible-chapter.component';
import { BibleIndexComponent } from './index/bible-index.component';
import { BibleVersionsComponent } from './versions/bible-versions.component';

const routes: Routes = [
  {
    path: 'bible',
    component: BibleVersionsComponent,
  },
  {
    path: 'bible',
    component: BibleComponent,
    children: [
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
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BibleRoutingModule { }
