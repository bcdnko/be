import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibleRoutingModule } from './bible-routing.module';
import { BibleIndexComponent } from './index/bible-index.component';
import { BibleChapterComponent } from './chapter/bible-chapter.component';
import { BibleBookSelectorComponent } from './book-selector/bible-book-selector.component';
import { BibleBookSelectorColumnsComponent } from './book-selector/columns/bible-book-selector-columns.component';
import { BibleComponent } from './bible/bible.component';

@NgModule({
  declarations: [
    BibleIndexComponent,
    BibleChapterComponent,
    BibleBookSelectorComponent,
    BibleBookSelectorColumnsComponent,
    BibleComponent
  ],
  imports: [
    CommonModule,
    BibleRoutingModule
  ],
})
export class BibleModule { }
