import { Component, OnInit } from '@angular/core';

import { Status, Voter } from '../services/vote.model';
import { VoteService } from '../services/vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
  constructor(private voteService: VoteService) {}

  status: Status;

  ngOnInit(): void {
    this.initDate();
  }

  initDate(): void {
    this.voteService.getStatus().subscribe((status) => {
      this.status = status;
    });
  }

  getVoteCode(): void {
    const voter: Voter = {
      pesel: 12412,
      firstName: 'a',
      lastName: 'b',
    };

    this.voteService.getVoteCode(voter).subscribe((voteCode) => {});
  }
}
