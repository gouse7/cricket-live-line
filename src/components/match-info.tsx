import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockMatchInfo } from "@/lib/mock-data"

interface MatchInfoProps {
  match: any
}

export default function MatchInfo({ match }: MatchInfoProps) {
  const matchInfo = mockMatchInfo[match.id]

  if (!matchInfo) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Match information not available</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Match Details</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Series</dt>
              <dd className="mt-1">{matchInfo.series}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Match</dt>
              <dd className="mt-1">{matchInfo.match}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Venue</dt>
              <dd className="mt-1">{matchInfo.venue}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Date & Time</dt>
              <dd className="mt-1">
                {matchInfo.date}, {matchInfo.time}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Toss</dt>
              <dd className="mt-1">{matchInfo.toss}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Officials</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Umpires</dt>
                <dd className="mt-1">{matchInfo.umpires.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Third Umpire</dt>
                <dd className="mt-1">{matchInfo.thirdUmpire}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Match Referee</dt>
                <dd className="mt-1">{matchInfo.matchReferee}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Weather</dt>
                <dd className="mt-1">{matchInfo.weather}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Pitch</dt>
                <dd className="mt-1">{matchInfo.pitch}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

