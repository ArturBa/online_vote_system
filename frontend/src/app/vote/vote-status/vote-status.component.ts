import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Votes } from '../../services/vote.model';
import { VoteService } from '../../services/vote.service';

@Component({
  selector: 'app-vote-status',
  templateUrl: './vote-status.component.html',
  styleUrls: ['./vote-status.component.scss'],
})
export class VoteStatusComponent implements OnInit {
  @Input() id: number;
  votes: Votes;

  constructor(
    protected voteService: VoteService,
    protected cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.voteService.getVotes(this.id).subscribe((res) => {
      this.votes = res;
      this.cdr.detectChanges();
    });
  }

  get progress(): number {
    if (this.votes) {
      return (this.votes.counted / this.votes.all) * 100;
    }
    return 0;
  }
}
