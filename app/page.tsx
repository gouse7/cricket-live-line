"use client"
import { useState, useEffect } from 'react';
import { fetchHomeList, Match } from '@/lib/api';
import MatchCard from '@/components/match-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function MatchSection({ 
  title, 
  matches, 
  emptyMessage 
}: { 
  title: string, 
  matches: Match[], 
  emptyMessage: string 
}) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {matches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map((match) => (
            <MatchCard key={match.match_id} match={match} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">{emptyMessage}</p>
      )}
    </div>
  );
}

function MatchesList() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const fetchedMatches = await fetchHomeList();
        setMatches(fetchedMatches);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load matches'));
        setIsLoading(false);
      }
    };

    loadMatches();
    const intervalId = setInterval(loadMatches, 60000); // Refresh every minute

    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load matches: {error.message}</div>;

  const liveMatches = matches.filter(match => 
    match.match_status.toLowerCase() === 'live'
  );

  const upcomingMatches = matches.filter(match => 
    ['upcoming', 'not started'].includes(match.match_status.toLowerCase())
  );

  const completedMatches = matches.filter(match => 
    ['completed', 'finished'].includes(match.match_status.toLowerCase())
  );

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-8">
        <TabsTrigger value="all">All Matches</TabsTrigger>
        <TabsTrigger value="live">Live</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <MatchSection 
          title="Live Matches" 
          matches={liveMatches} 
          emptyMessage="No live matches at the moment" 
        />
        <MatchSection 
          title="Upcoming Matches" 
          matches={upcomingMatches} 
          emptyMessage="No upcoming matches" 
        />
        <MatchSection 
          title="Completed Matches" 
          matches={completedMatches} 
          emptyMessage="No completed matches" 
        />
      </TabsContent>

      <TabsContent value="live">
        <MatchSection 
          title="Live Matches" 
          matches={liveMatches} 
          emptyMessage="No live matches at the moment" 
        />
      </TabsContent>

      <TabsContent value="upcoming">
        <MatchSection 
          title="Upcoming Matches" 
          matches={upcomingMatches} 
          emptyMessage="No upcoming matches" 
        />
      </TabsContent>

      <TabsContent value="completed">
        <MatchSection 
          title="Completed Matches" 
          matches={completedMatches} 
          emptyMessage="No completed matches" 
        />
      </TabsContent>
    </Tabs>
  );
}

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Cricket Matches</h1>
      <MatchesList />
    </main>
  );
}
