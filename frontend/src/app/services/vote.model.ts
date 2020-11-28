export interface VoteStatus {
  electionsState: string;
  startDate: string;
  endDate: string;
}

export enum ElectionsState {
  EDIT = 'EDIT',
  AVAILABLE = 'AVAILABLE',
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  DONE = 'DONE',
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
