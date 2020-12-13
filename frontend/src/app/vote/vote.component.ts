import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  id: number;

  constructor(
    protected voteService: VoteService,
    protected route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.voteService
      .getStatus(this.id)
      .subscribe((status) => (this.voteStatus = status));
  }
}
