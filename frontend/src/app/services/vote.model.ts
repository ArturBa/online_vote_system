export interface VoteStatus {
  electionState: string;
  startDate: string;
  endDate: string;
}

export enum ElectionsState {
  SUCCESS = 'SUCCESS',
  VOTED_ALREADY = 'VOTED_ALREADY',
  NOT_PERMITTED = 'NOT_PERMITTED',
}

export interface Vote {
  code: string;
  vote_list: string[];
}

export interface Voter {
  PESEL: number;
  firstName: string;
  lastName: string;
}

export interface Candidates {
  maxVotes: number;
  list: List[];
}

export interface List {
  name: string;
  candidates: Candidate[];
}

export interface Candidate {
  id: string;
  name: string;
  surname: string;
}
