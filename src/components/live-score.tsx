import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface LiveScoreProps {
  match: any
  className?: string
}

export default function LiveScore({ match, className }: LiveScoreProps) {
  // Determine which team is currently batting (for live matches)
  const battingTeam =
    match.status === "live"
      ? match.currentStatus?.toLowerCase().includes(match.team1.name.toLowerCase())
        ? match.team2.name
        : match.team1.name
      : null

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className={cn("p-6", match.status === "live" && "border-l-4 border-red-500")}>
        <div className="flex justify-between items-center mb-4">
          {match.status === "live" && (
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
              <Badge className="bg-red-500">LIVE</Badge>
            </div>
          )}
          {match.status === "completed" && <Badge variant="secondary">Completed</Badge>}
          {match.status === "upcoming" && <Badge variant="outline">Upcoming</Badge>}
          <span className="text-sm text-muted-foreground">{match.format}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg transition-colors",
                battingTeam === match.team1.name && "bg-primary/10",
              )}
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={`/placeholder.svg?text=${match.team1.short}`}
                  alt={match.team1.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{match.team1.name}</h3>
                {match.status !== "upcoming" && <p className="text-2xl font-bold">{match.team1.score}</p>}
                {battingTeam === match.team1.name && (
                  <Badge variant="outline" className="mt-1">
                    Batting
                  </Badge>
                )}
              </div>
            </div>

            <div
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg transition-colors",
                battingTeam === match.team2.name && "bg-primary/10",
              )}
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-full">
                <Image
                  src={`/placeholder.svg?text=${match.team2.short}`}
                  alt={match.team2.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">{match.team2.name}</h3>
                {match.status !== "upcoming" && <p className="text-2xl font-bold">{match.team2.score}</p>}
                {battingTeam === match.team2.name && (
                  <Badge variant="outline" className="mt-1">
                    Batting
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            {match.status === "upcoming" ? (
              <div>
                <p className="text-lg">Match starts at {match.time}</p>
                <p className="text-muted-foreground">{match.date}</p>
                <p className="text-muted-foreground mt-2">{match.venue}</p>
              </div>
            ) : match.status === "completed" ? (
              <div>
                <p className="text-lg font-medium">{match.result}</p>
                <p className="text-muted-foreground mt-2">{match.venue}</p>
              </div>
            ) : (
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-lg font-medium mb-2">{match.currentStatus}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Current Run Rate:</span>
                    <span className="font-bold">{match.currentRunRate}</span>
                  </div>
                  {match.requiredRunRate && (
                    <div className="flex justify-between">
                      <span>Required Run Rate:</span>
                      <span className="font-bold">{match.requiredRunRate}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Last Ball:</span>
                    <span className="font-bold">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Over:</span>
                    <span className="font-mono">1 4 0 W 2 1</span>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4 text-sm">{match.venue}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

