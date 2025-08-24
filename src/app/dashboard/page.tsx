"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Vote, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Users, 
  BarChart3, 
  LogOut,
  Bell,
  Settings,
  ExternalLink,
  Search
} from "lucide-react";
import { NotificationCenter } from "@/components/NotificationCenter";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for active elections
  const activeElections = [
    {
      id: 1,
      title: "City Council Election 2024",
      description: "Vote for your preferred city council representatives",
      deadline: "2024-12-15",
      totalVoters: 15000,
      votesCast: 8750,
      status: "active",
      categories: ["Mayor", "District 1", "District 2", "District 3"]
    },
    {
      id: 2,
      title: "School Board Referendum",
      description: "Approve the proposed school budget improvements",
      deadline: "2024-12-20",
      totalVoters: 12000,
      votesCast: 3200,
      status: "active",
      categories: ["For", "Against"]
    }
  ];

  // Mock data for past elections
  const pastElections = [
    {
      id: 3,
      title: "State Primary Election",
      description: "Primary elections for state representatives",
      votedDate: "2024-11-05",
      voteId: "VC-2024-11-05-ABC123",
      status: "completed",
      verificationStatus: "verified"
    },
    {
      id: 4,
      title: "Local Proposition Vote",
      description: "Community infrastructure improvements",
      votedDate: "2024-10-15",
      voteId: "VC-2024-10-15-DEF456",
      status: "completed",
      verificationStatus: "verified"
    }
  ];

  const handleVote = async (electionId: number) => {
    setIsLoading(true);
    try {
      // Simulate voting process
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Vote Cast Successfully",
        description: "Your vote has been recorded on the blockchain!",
      });
    } catch (error) {
      toast({
        title: "Voting Failed",
        description: "Failed to cast vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyVote = (voteId: string) => {
    toast({
      title: "Vote Verification",
      description: `Redirecting to verify vote ${voteId}...`,
    });
  };

  const getProgressPercentage = (votesCast: number, totalVoters: number) => {
    return Math.round((votesCast / totalVoters) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">VoteChain</span>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationCenter />
              <Button variant="ghost" size="sm" asChild>
                <a href="/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </a>
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, Voter!</h1>
              <p className="text-gray-600 mt-2">
                Your secure voting dashboard for active and past elections
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Connected Wallet</p>
                <p className="text-sm font-mono text-gray-900">0x742d...8a9c</p>
              </div>
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>VV</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Elections</CardTitle>
              <Vote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeElections.length}</div>
              <p className="text-xs text-muted-foreground">
                Available for voting
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Votes Cast</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pastElections.length}</div>
              <p className="text-xs text-muted-foreground">
                In past elections
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verification Status</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100%</div>
              <p className="text-xs text-muted-foreground">
                All votes verified
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="outline"
              className="h-20 flex-col gap-2"
              asChild
            >
              <a href="/elections">
                <Search className="h-6 w-6" />
                <span>Find Elections</span>
              </a>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline" asChild>
              <a href="/settings">
                <Settings className="h-6 w-6" />
                <span>Settings</span>
              </a>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline" asChild>
              <a href="/verify">
                <CheckCircle className="h-6 w-6" />
                <span>Verify Vote</span>
              </a>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline" asChild>
              <a href="/admin">
                <Shield className="h-6 w-6" />
                <span>Admin Portal</span>
              </a>
            </Button>
          </div>
        </div>

        {/* Elections Tabs */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Elections</TabsTrigger>
            <TabsTrigger value="past">Past Elections</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeElections.map((election) => (
              <Card key={election.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{election.title}</CardTitle>
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      </div>
                      <CardDescription>{election.description}</CardDescription>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Deadline: {election.deadline}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{election.votesCast.toLocaleString()} of {election.totalVoters.toLocaleString()} voted</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => window.location.href = `/vote?id=${election.id}`}
                      disabled={isLoading}
                      size="lg"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Processing...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Vote className="h-4 w-4" />
                          Vote Now
                        </div>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Voter Turnout</span>
                        <span>{getProgressPercentage(election.votesCast, election.totalVoters)}%</span>
                      </div>
                      <Progress 
                        value={getProgressPercentage(election.votesCast, election.totalVoters)} 
                        className="h-2"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Voting Categories:</h4>
                      <div className="flex flex-wrap gap-2">
                        {election.categories.map((category, index) => (
                          <Badge key={index} variant="outline">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastElections.map((election) => (
              <Card key={election.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{election.title}</CardTitle>
                        <Badge variant="secondary">
                          Completed
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                      <CardDescription>{election.description}</CardDescription>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Voted: {election.votedDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Vote ID: {election.voteId}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => window.location.href = `/verify?voteId=${election.voteId}`}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Verify Vote
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Your vote has been successfully recorded and verified on the blockchain.</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}