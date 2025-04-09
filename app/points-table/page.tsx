import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockTournaments } from "@/lib/mock-data"

export default function PointsTablePage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Points Table</h1>

      <Tabs defaultValue="t20-world-cup" className="w-full">
        <TabsList className="mb-6 flex flex-wrap">
          {mockTournaments.map((tournament) => (
            <TabsTrigger key={tournament.id} value={tournament.id}>
              {tournament.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {mockTournaments.map((tournament) => (
          <TabsContent key={tournament.id} value={tournament.id}>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead className="text-center">Matches</TableHead>
                    <TableHead className="text-center">Won</TableHead>
                    <TableHead className="text-center">Lost</TableHead>
                    <TableHead className="text-center">Tied</TableHead>
                    <TableHead className="text-center">NRR</TableHead>
                    <TableHead className="text-center">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tournament.standings.map((team, index) => (
                    <TableRow key={team.team}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{team.team}</TableCell>
                      <TableCell className="text-center">{team.matches}</TableCell>
                      <TableCell className="text-center">{team.won}</TableCell>
                      <TableCell className="text-center">{team.lost}</TableCell>
                      <TableCell className="text-center">{team.tied}</TableCell>
                      <TableCell className="text-center">{team.nrr}</TableCell>
                      <TableCell className="text-center font-bold">{team.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

