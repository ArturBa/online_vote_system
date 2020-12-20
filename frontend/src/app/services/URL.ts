const MainURL = 'http://localhost:5000/election/:id/';

export const API_URL = {
  status: MainURL + 'status',
  voteCote: MainURL + 'getCode',
  candidates: MainURL + 'candidates',
  vote: MainURL + 'vote',
  votes: MainURL + 'votes',
};
