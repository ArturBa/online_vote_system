import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Candidates, Vote, List, Candidate } from '../../services/vote.model';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-make-vote',
  templateUrl: './make-vote.component.html',
  styleUrls: ['./make-vote.component.scss'],
})
export class MakeVoteComponent {
  candidates: Candidates;
  selectedCandidates: List[] = [];
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

  isSpareVote(): boolean {
    return this.selectedCandidates.length < this.candidates.maxVotes;
  }

  isCandidateSelected(listID: string, candidate: Candidate): boolean {
    return (
      this.selectedCandidates.indexOf(this.voteStructure(listID, candidate)) >=
      0
    );
  }

  selectionValid(): boolean {
    return (
      this.selectedCandidates.length > 0 &&
      this.selectedCandidates.length <= this.candidates.maxVotes
    );
  }

  toggleCandidate(listID: string, candidate: Candidate) {
    if (this.isCandidateSelected(listID, candidate)) {
      this.selectedCandidates.splice(
        this.selectedCandidates.indexOf(this.voteStructure(listID, candidate)),
        1,
      );
    } else if (this.isSpareVote()) {
      this.selectedCandidates.push(this.voteStructure(listID, candidate));
    }
  }

  voteStructure = (listID: string, candidate: Candidate): List => {
    return {
      id: listID,
      candidates: [
        {
          ...candidate,
        },
      ],
    } as List;
  };

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
