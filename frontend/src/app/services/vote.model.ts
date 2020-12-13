export interface Status {
  status: string;
  startDate: string;
  endDate: string;
}

export enum VoteCodeStatus {
  SUCCESS = 'SUCCESS',
  VOTED_ALREADY = 'VOTED_ALREADY',
  NOT_PERMITTED = 'NOT_PERMITTED',
}
export interface VoteCode {
  status: VoteCodeStatus;
  value: string;
}

export interface Voter {
  pesel: number;
  firstName: string;
  lastName: string;
}
