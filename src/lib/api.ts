import axios from 'axios';

const API_KEY = 'e2c5f7a19b3d4e6a8f0c2d7b5a1e3f9g';

const BASE_URL = 'https://api.crictez.in/v7';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export interface ScoreDetails {
  score: number;
  wicket: number;
  ball: number;
  over: string;
}

export interface NeedRunBall {
  run: number;
  ball: number;
}

export interface Match {
  match_id: string;
  match_status: string;
  team_a_short: string;
  team_b_short: string;
  team_a_img: string;
  team_b_img: string;
  match_date: string;
  match_time: string;
  venue: string;
  tournament_name: string;
  team_a_score: Record<number, ScoreDetails>;
  team_b_score: Record<number, ScoreDetails>;
  current_inning: number;
  batting_team: string;
  team_a: string;
  team_b: string;
  series: string;
  matchs: string;
  need_run_ball?: string;
  toss?: string;
  result?: string;
}

export const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data.data || [];
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};

export const fetchHomeList = async (): Promise<Match[]> => {
  try {
    const response = await api.get(`/homeList/${API_KEY}`);
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching home list:', error);
    throw error;
  }
};

export const fetchLiveMatchList = async (): Promise<Match[]> => {
  try {
    const response = await api.get(`/liveMatchList/${API_KEY}`);
    const matches = response.data.data || [];
    return matches.map((match: any) => {
      // Ensure score objects are properly formatted
      const team_a_score: Record<number, ScoreDetails> = {};
      const team_b_score: Record<number, ScoreDetails> = {};

      // Process team A scores
      if (match.team_a_score) {
        Object.entries(match.team_a_score).forEach(([inning, score]: [string, any]) => {
          if (score && typeof score === 'object') {
            team_a_score[Number(inning)] = {
              score: Number(score.score || 0),
              wicket: Number(score.wicket || 0),
              ball: Number(score.ball || 0),
              over: String(score.over || '0.0')
            };
          }
        });
      }

      // Process team B scores
      if (match.team_b_score) {
        Object.entries(match.team_b_score).forEach(([inning, score]: [string, any]) => {
          if (score && typeof score === 'object') {
            team_b_score[Number(inning)] = {
              score: Number(score.score || 0),
              wicket: Number(score.wicket || 0),
              ball: Number(score.ball || 0),
              over: String(score.over || '0.0')
            };
          }
        });
      }

      return {
        ...match,
        team_a_score,
        team_b_score,
        current_inning: Number(match.current_inning || 1)
      };
    });
  } catch (error) {
    console.error('Error fetching live match list:', error);
    throw error;
  }
};

export const fetchMatchDetails = async (matchId: string) => {
  try {
    const response = await api.get(`/liveMatch/${API_KEY}`, {
      params: {
        match_id: matchId
      }
    });
    return response.data.data || null;
  } catch (error) {
    console.error(`Error fetching match details for ${matchId}:`, error);
    throw error;
  }
};
