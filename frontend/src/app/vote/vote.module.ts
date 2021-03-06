import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { GenerateCodeComponent } from './generate-code/generate-code.component';
import { MakeVoteComponent } from './make-vote/make-vote.component';
import { VoteComponent } from './vote.component';
import { VoteRoutingModule } from './vote-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VoteStatusComponent } from './vote-status/vote-status.component';

@NgModule({
  declarations: [
    VoteComponent,
    GenerateCodeComponent,
    MakeVoteComponent,
    VoteStatusComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VoteRoutingModule,

    MatSnackBarModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class VoteModule {}
