import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoteRoutingModule } from './vote-routing.module';
import { VoteComponent } from './vote.component';
import { GenerateCodeComponent } from './generate-code/generate-code.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MakeVoteComponent } from './make-vote/make-vote.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [VoteComponent, GenerateCodeComponent, MakeVoteComponent],
  imports: [
    CommonModule,
    VoteRoutingModule,
    ReactiveFormsModule,

    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class VoteModule {}
