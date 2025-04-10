import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Match } from '@/lib/api';

const getStatusBadge = (status: string) => {
  const lowercaseStatus = status.toLowerCase();
  switch (lowercaseStatus) {
    case "live":
      return <Badge className="bg-red-500 animate-pulse">LIVE</Badge>;
    case "upcoming":
    case "not started":
      return <Badge variant="outline">Upcoming</Badge>;
    case "completed":
    case "finished":
      return <Badge variant="secondary">Completed</Badge>;
    default:
      return null;
  }
};

export default function MatchCard({ match }: { match: Match }) {
  // Function to get scores for all innings
  const getAllTeamScores = (teamId: string) => {
    const scores = [];
    const scoreData = teamId === match.team_a ? match.team_a_score : match.team_b_score;

    if (!scoreData) return null;

    // Get all innings scores
    Object.entries(scoreData).forEach(([inning, score]) => {
      if (score && typeof score === 'object' && 'score' in score && 'wicket' in score && 'over' in score) {
        scores.push(`${score.score}/${score.wicket} (${score.over})`);
      }
    });

    return scores.length > 0 ? scores.join(' | ') : null;
  };

  // Determine if a team is currently batting
  const isTeamBatting = (teamId: string) => {
    return match.batting_team === teamId;
  };

  // Get match status details
  const getMatchStatusDetails = () => {
    const lowercaseStatus = match.match_status.toLowerCase();
    
    switch (lowercaseStatus) {
      case "live":
        // For live matches, show need_run_ball or toss details
        if (match.need_run_ball) {
          return match.need_run_ball;
        }
        return match.toss || "Live Match";
      
      case "completed":
      case "finished":
        // For completed matches, show result
        return match.result || "Match Completed";
      
      case "upcoming":
      case "not started":
      default:
        return match.matchs;
    }
  };

  return (
    <Link 
      href={`/match/${match.match_id}`} 
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
    >
      <div className="p-4 flex flex-col">
        {/* Match Header */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-muted-foreground truncate">
            {match.tournament_name}
          </span>
          {getStatusBadge(match.match_status)}
        </div>

        {/* Match Details */}
        <div className="flex items-center justify-between space-x-4">
          {/* Team A */}
          <div className="flex items-center space-x-2 w-1/2">
            <Image 
              src={match.team_a_img} 
              alt={match.team_a_short} 
              width={40} 
              height={40} 
              className="rounded-full"
            />
            <div className="flex-grow">
              <h3 className="font-semibold text-sm truncate">
                {match.team_a_short}
              </h3>
              {isTeamBatting(match.team_a) ? (
                <p className="text-xs font-bold text-green-600">
                  {getAllTeamScores(match.team_a)}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {getAllTeamScores(match.team_a)}
                </p>
              )}
            </div>
          </div>

          {/* Match Time/Score */}
          <div className="text-center w-full">
            <p className="text-xs text-muted-foreground">
              {match.match_time} | {match.match_date}
            </p>
            <p className="text-xs text-muted-foreground">
              {getMatchStatusDetails()}
            </p>
          </div>

          {/* Team B */}
          <div className="flex items-center space-x-2 w-1/2 justify-end">
            <div className="flex-grow text-right">
              <h3 className="font-semibold text-sm truncate">
                {match.team_b_short}
              </h3>
              {isTeamBatting(match.team_b) ? (
                <p className="text-xs font-bold text-green-600">
                  {getAllTeamScores(match.team_b)}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {getAllTeamScores(match.team_b)}
                </p>
              )}
            </div>
            <Image 
              src={match.team_b_img} 
              alt={match.team_b_short} 
              width={40} 
              height={40} 
              className="rounded-full"
            />
          </div>
        </div>

        {/* Venue */}
        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground truncate">
            {match.venue}
          </p>
        </div>
      </div>
    </Link>
  );
}
