import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Candidates, Vote } from 'src/app/services/vote.model';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-make-vote',
  templateUrl: './make-vote.component.html',
  styleUrls: ['./make-vote.component.scss'],
})
export class MakeVoteComponent {
  candidates: Candidates;
  selectedCandidates: string[] = [];
  form: FormGroup;

  constructor(
    protected voteService: VoteService,
    protected snackBar: MatSnackBar,
  ) {
    this.voteService.getCandidates().subscribe((candidates) => {
      this.candidates = candidates;
    });
    this.form = MakeVoteComponent.generateForm();
  }

  static generateForm(): FormGroup {
    return new FormGroup({
      code: new FormControl('', Validators.required),
    });
  }

  isSpateVote(): boolean {
    return this.selectedCandidates.length < this.candidates.maxVotes;
  }

  isCandidateSelected(code: string): boolean {
    return this.selectedCandidates.indexOf(code) >= 0;
  }

  selectionValid(): boolean {
    return (
      this.selectedCandidates.length > 0 &&
      this.selectedCandidates.length <= this.candidates.maxVotes
    );
  }

  toggleCandidate(code: string) {
    if (this.isCandidateSelected(code)) {
      this.selectedCandidates.splice(this.selectedCandidates.indexOf(code), 1);
    } else if (this.isSpateVote()) {
      this.selectedCandidates.push(code);
    }
  }

  submit(): void {
    this.form.markAllAsTouched();

    const vote: Vote = {
      ...this.form.value,
      vote_list: this.selectedCandidates,
    };
    this.voteService.vote(vote).subscribe(
      () => {
        this.snackBar.open('Vote success', 'X', { duration: 1000 });
        this.selectedCandidates = [];
        this.form.get('code').patchValue('');
      },
      () => {
        this.snackBar.open('Code invalid', 'X', {
          duration: 50000,
          panelClass: 'snack-bar-error',
        });
      },
    );
  }
}
