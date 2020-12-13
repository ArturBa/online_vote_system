import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './URL';

import { Status, VoteCode, Voter } from './vote.model';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  constructor(private httpClient: HttpClient) {}

  getStatus(): Observable<Status> {
    return this.httpClient.get<Status>(API_URL.status);
  }

  getVoteCode(voter: Voter): Observable<VoteCode> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post<VoteCode>(
      API_URL.voteCote,
      JSON.stringify(voter),
      {
        headers,
      },
    );
  }
}
