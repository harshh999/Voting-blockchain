"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Shield, 
  Users, 
  Vote, 
  BarChart3, 
  Calendar, 
  Clock, 
  Settings, 
  LogOut,
  Bell,
  Plus,
  Eye,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Activity,
  FileText,
  Download
} from "lucide-react";
import { NotificationCenter } from "@/components/NotificationCenter";
import { BlockchainExplorer } from "@/components/BlockchainExplorer";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for elections
  const elections = [
    {
      id: 1,
      title: "City Council Election 2024",
      status: "active",
      startDate: "2024-11-01",
      endDate: "2024-12-15",
      totalVoters: 15000,
      votesCast: 8750,
      turnout: 58.3,
      candidates: 12,
      issues: 0
    },
    {
      id: 2,
      title: "School Board Referendum",
      status: "active",
      startDate: "2024-11-15",
      endDate: "2024-12-20",
      totalVoters: 12000,
      votesCast: 3200,
      turnout: 26.7,
      candidates: 2,
      issues: 1
    },
    {
      id: 3,
      title: "State Primary Election",
      status: "completed",
      startDate: "2024-10-01",
      endDate: "2024-11-05",
      totalVoters: 25000,
      votesCast: 18750,
      turnout: 75.0,
      candidates: 8,
      issues: 0
    }
  ];

  // Mock analytics data
  const analytics = {
    totalElections: 3,
    activeElections: 2,
    completedElections: 1,
    totalVoters: 52000,
    totalVotesCast: 30700,
    averageTurnout: 59.0,
    systemHealth: "excellent",
    blockchainStatus: "operational",
    lastBlock: 18457292,
    pendingTransactions: 3
  };

  const handleCreateElection = () => {
    toast({
      title: "Create Election",
      description: "Redirecting to election creation wizard...",
    });
  };

  const handleViewElection = (electionId: number) => {
    toast({
      title: "Election Details",
      description: `Loading details for election ${electionId}...`,
    });
  };

  const handleCertifyElection = (electionId: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Election Certified",
        description: "Election has been successfully certified and results are final.",
      });
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">VoteChain Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationCenter />
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Admin User</span>
              </div>
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage elections, monitor voting activity, and ensure system integrity
          </p>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Excellent</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blockchain Status</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Operational</div>
              <p className="text-xs text-muted-foreground">
                Block #{analytics.lastBlock.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending TX</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.pendingTransactions}</div>
              <p className="text-xs text-muted-foreground">
                Transactions in queue
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Turnout</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.averageTurnout}%</div>
              <p className="text-xs text-muted-foreground">
                Across all elections
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Quick Actions</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={handleCreateElection}
                  className="h-20 flex-col gap-2"
                  variant="outline"
                >
                  <Plus className="h-6 w-6" />
                  <span>Create New Election</span>
                </Button>
                <Button className="h-20 flex-col gap-2" variant="outline">
                  <Users className="h-6 w-6" />
                  <span>Manage Voter Rolls</span>
                </Button>
                <Button className="h-20 flex-col gap-2" variant="outline">
                  <FileText className="h-6 w-6" />
                  <span>Generate Reports</span>
                </Button>
              </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="elections" className="space-y-4">
              <TabsList>
                <TabsTrigger value="elections">Elections</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="voters">Voter Management</TabsTrigger>
              </TabsList>

              <TabsContent value="elections" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Election Management</h2>
                  <Button onClick={handleCreateElection}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Election
                  </Button>
                </div>

                <div className="space-y-4">
                  {elections.map((election) => (
                    <Card key={election.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-xl">{election.title}</CardTitle>
                              {getStatusBadge(election.status)}
                              {election.issues > 0 && (
                                <Badge variant="destructive" className="bg-red-100 text-red-800">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  {election.issues} Issue{election.issues > 1 ? 's' : ''}
                                </Badge>
                              )}
                            </div>
                            <CardDescription>
                              {election.startDate} - {election.endDate}
                            </CardDescription>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{election.votesCast.toLocaleString()} of {election.totalVoters.toLocaleString()} voted</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Vote className="h-4 w-4" />
                                <span>{election.candidates} candidates</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline"
                              onClick={() => handleViewElection(election.id)}
                              className="flex items-center gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              View Details
                            </Button>
                            {election.status === "completed" && (
                              <Button 
                                onClick={() => handleCertifyElection(election.id)}
                                disabled={isLoading}
                                className="flex items-center gap-2"
                              >
                                {isLoading ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                ) : (
                                  <CheckCircle className="h-4 w-4" />
                                )}
                                Certify
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Voter Turnout</span>
                              <span>{election.turnout}%</span>
                            </div>
                            <Progress value={election.turnout} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <h2 className="text-xl font-semibold">Election Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Overall Statistics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">{analytics.totalElections}</div>
                          <div className="text-sm text-gray-600">Total Elections</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{analytics.activeElections}</div>
                          <div className="text-sm text-gray-600">Active</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{analytics.totalVoters.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">Total Voters</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{analytics.totalVotesCast.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">Votes Cast</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Transaction Processing</span>
                          <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Network Latency</span>
                          <Badge className="bg-green-100 text-green-800">&lt; 1s</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Success Rate</span>
                          <Badge className="bg-green-100 text-green-800">99.9%</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Security Score</span>
                          <Badge className="bg-green-100 text-green-800">A+</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="voters" className="space-y-4">
                <h2 className="text-xl font-semibold">Voter Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Registered Voters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{analytics.totalVoters.toLocaleString()}</div>
                      <p className="text-sm text-gray-600">Total registered</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Active Voters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{analytics.totalVotesCast.toLocaleString()}</div>
                      <p className="text-sm text-gray-600">Participated in elections</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Verification Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">100%</div>
                      <p className="text-sm text-gray-600">Votes verified</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Blockchain Explorer */}
          <div className="space-y-6">
            <BlockchainExplorer />
          </div>
        </div>
      </main>
    </div>
  );
}