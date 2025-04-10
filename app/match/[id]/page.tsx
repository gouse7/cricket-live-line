"use client";

import { useEffect, useState } from 'react';
import { fetchMatchDetails, Match } from '@/lib/api';
import MatchDetails from '@/components/match-details';

type PageProps = {
  params: {
    id: string;
  };
};

export default function MatchDetailsPage() {
  const [matchDetails, setMatchDetails] = useState<Match | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        setIsLoading(true);
        const details = await fetchMatchDetails("");
        setMatchDetails(details);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch match details'));
        setIsLoading(false);
      }
    };

    fetchMatch();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-muted-foreground">Loading match details...</p>
      </div>
    );
  }
  // PV!pL)i&-7)JZsm
  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!matchDetails) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-muted-foreground">Match details not available</p>
      </div>
    );
  }

  return <MatchDetails match={matchDetails} />
}