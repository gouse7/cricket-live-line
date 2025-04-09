"use client"
import React, { useState, useEffect } from 'react';
import { fetchMatchDetails, Match } from '@/lib/api';
import MatchInfo from '@/components/match-info';
import Timeline from '@/components/timeline';
import Scorecard from '@/components/scorecard';
import Commentary from '@/components/commentary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MatchDetailsPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const [matchDetails, setMatchDetails] = useState<Match | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        setIsLoading(true);
        const details = await fetchMatchDetails(params.id);
        setMatchDetails(details);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch match details'));
        setIsLoading(false);
      }
    };

    fetchMatch();
    const intervalId = setInterval(fetchMatch, 60000); // Refresh every minute

    return () => clearInterval(intervalId);
  }, [params.id]);

  if (isLoading) return <div>Loading match details...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!matchDetails) return <div>No match details found</div>;

  return (
    <div className="container mx-auto px-4 py-6">
      <MatchInfo match={matchDetails} />
      
      <Tabs defaultValue="timeline" className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
          <TabsTrigger value="commentary">Commentary</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <Timeline match={matchDetails} />
        </TabsContent>

        <TabsContent value="scorecard">
          <Scorecard match={matchDetails} />
        </TabsContent>

        <TabsContent value="commentary">
          <Commentary match={matchDetails} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
