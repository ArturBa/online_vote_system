import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './URL';

import { VoteStatus, Vote, Voter, Candidates, Votes } from './vote.model';

@Injectable({
  providedIn: 'root',
})
export class VoteService {
  constructor(private httpClient: HttpClient) {}

  getStatus(id: number): Observable<VoteStatus> {
    return this.httpClient.get<VoteStatus>(
      this.replaceAddress(id, API_URL.status),
    );
  }

  getVotes(id: number): Observable<Votes> {
    return this.httpClient.get<Votes>(this.replaceAddress(id, API_URL.votes));
  }

  getVoteCode(id: number, voter: Voter): Observable<string> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post<string>(
      this.replaceAddress(id, API_URL.voteCote),
      JSON.stringify(voter),
      { headers, responseType: 'text' as 'json' },
    );
  }

  getCandidates(id: number): Observable<Candidates> {
    return this.httpClient.get<Candidates>(
      this.replaceAddress(id, API_URL.candidates),
    );
  }

  vote(id: number, vote: Vote): Observable<void> {
    const headers = { 'content-type': 'application/json' };
    return this.httpClient.post<void>(
      this.replaceAddress(id, API_URL.vote),
      JSON.stringify(vote),
      { headers, responseType: 'text' as 'json' },
    );
  }

  protected replaceAddress(id: number, address: string): string {
    return address.replace(':id', id.toString());
  }
}
