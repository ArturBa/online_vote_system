import { Component, OnInit } from '@angular/core';

import { ElectionsState, VoteStatus } from '../services/vote.model';
import { VoteService } from '../services/vote.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
})
export class VoteComponent implements OnInit {
  readonly electionState = ElectionsState;
  voteStatus: VoteStatus;

  constructor(protected voteService: VoteService) {}

  ngOnInit(): void {
    this.voteService
      .getStatus()
      .subscribe((status) => (this.voteStatus = status));
  }
}
