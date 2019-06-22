import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibleRoutingModule } from './bible-routing.module';
import { BibleIndexComponent } from './bible-index/bible-index.component';

@NgModule({
  declarations: [BibleIndexComponent],
  imports: [
    CommonModule,
    BibleRoutingModule
  ],
})
export class BibleModule { }
