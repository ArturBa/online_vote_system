import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './URL';

import { VoteStatus, Vote, Voter, Candidates } from './vote.model';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  constructor(private httpClient: HttpClient) {}

  getStatus(): Observable<VoteStatus> {
    return this.httpClient.get<VoteStatus>(API_URL.status);
  }

  getVoteCode(voter: Voter): Observable<string> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post<string>(
      API_URL.voteCote,
      JSON.stringify(voter),
      { headers, responseType: 'text' as 'json' },
    );
  }

  getCandidates(): Observable<Candidates> {
    return this.httpClient.get<Candidates>(API_URL.candidates);
  }

  vote(vote: Vote): Observable<void> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post<void>(API_URL.vote, JSON.stringify(vote), {
      headers,
    });
  }
}
