import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';

import { BibleRoutingModule } from './bible-routing.module';
import { BibleIndexComponent } from './index/bible-index.component';
import { BibleChapterComponent } from './chapter/bible-chapter.component';
import { BibleBookSelectorComponent } from './book-selector/bible-book-selector.component';
import { BibleComponent } from './bible/bible.component';
import { BibleService } from './bible.service';
import { BibleStateService } from './bible-state.service';
import { BibleNavigationService } from './bible-navigation.service';
import { BibleUrlService } from './bible-url.service';
import { BibleVersionsComponent } from './versions/bible-versions.component';
import { BibleVersionSelectorComponent } from './version-selector/bible-version-selector.component';
import { BibleChapterTextComponent } from './chapter-text/bible-chapter-text.component';
import { BibleVerseTextParser } from './parsers/bible-verse-text.parser';
import { BibleToolbarComponent } from './toolbar/bible-toolbar.component';

@NgModule({
  declarations: [
    BibleIndexComponent,
    BibleChapterComponent,
    BibleBookSelectorComponent,
    BibleComponent,
    BibleVersionsComponent,
    BibleVersionSelectorComponent,
    BibleChapterTextComponent,
    BibleToolbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbButtonsModule,
    BibleRoutingModule,
  ],
  providers: [
    BibleService,
    BibleUrlService,
    BibleStateService,
    BibleNavigationService,
    BibleVerseTextParser,
  ],
})
export class BibleModule { }
