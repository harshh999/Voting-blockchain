"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { VotingCharts } from "@/components/VotingCharts";
import { 
  Shield, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Vote, 
  Clock, 
  Activity,
  RefreshCw,
  Download,
  Calendar,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Eye,
  Filter,
  Zap,
  Database,
  Hash
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminAnalyticsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [liveData, setLiveData] = useState<any>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { toast } = useToast();

  // Mock live data
  const mockLiveData = {
    currentElections: [
      {
        id: 1,
        title: "City Council Election 2024",
        totalVoters: 15000,
        votesCast: 8750,
        turnout: 58.3,
        recentVotes: 45,
        timeRemaining: "15 days 8 hours"
      },
      {
        id: 2,
        title: "School Board Referendum",
        totalVoters: 12000,
        votesCast: 3200,
        turnout: 26.7,
        recentVotes: 23,
        timeRemaining: "20 days 8 hours"
      }
    ],
    systemMetrics: {
      transactionsPerMinute: 12,
      averageConfirmationTime: 15,
      activeUsers: 342,
      successRate: 99.9,
      blockchainHeight: 18457292,
      pendingTransactions: 3
    },
    voterDemographics: {
      byAge: {
        "18-25": 15,
        "26-35": 25,
        "36-45": 20,
        "46-55": 18,
        "56-65": 15,
        "65+": 7
      },
      byLocation: {
        "District 1": 30,
        "District 2": 25,
        "District 3": 20,
        "District 4": 15,
        "District 5": 10
      }
    },
    votingPatterns: {
      byTimeOfDay: [
        { hour: "6AM", votes: 45 },
        { hour: "9AM", votes: 234 },
        { hour: "12PM", votes: 567 },
        { hour: "3PM", votes: 445 },
        { hour: "6PM", votes: 678 },
        { hour: "9PM", votes: 234 }
      ],
      byDevice: {
        "Desktop": 65,
        "Mobile": 30,
        "Tablet": 5
      }
    }
  };

  useEffect(() => {
    loadLiveData();
    const interval = setInterval(loadLiveData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadLiveData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLiveData(mockLiveData);
      setLastUpdated(new Date());
    } catch (error) {
      toast({
        title: "Data Load Failed",
        description: "Failed to load analytics data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Analytics data is being prepared for download.",
    });
  };

  if (!liveData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">VoteChain Analytics</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadLiveData}
                disabled={isLoading}
              >
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Refresh
              </Button>
              <Button onClick={handleExportData} size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Real-Time Election Analytics</h1>
          <p className="text-gray-600 mt-2">
            Monitor voting activity, system performance, and election metrics in real-time
          </p>
        </div>

        {/* Live Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Active Users</CardTitle>
              <Users className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{liveData.systemMetrics.activeUsers}</div>
              <p className="text-xs text-muted-foreground">Currently online</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">TX/Min</CardTitle>
              <Activity className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{liveData.systemMetrics.transactionsPerMinute}</div>
              <p className="text-xs text-muted-foreground">Transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Confirm Time</CardTitle>
              <Clock className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{liveData.systemMetrics.averageConfirmationTime}s</div>
              <p className="text-xs text-muted-foreground">Average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-green-600">{liveData.systemMetrics.successRate}%</div>
              <p className="text-xs text-muted-foreground">Success rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Block Height</CardTitle>
              <BarChart3 className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{liveData.systemMetrics.blockchainHeight.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Latest block</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium">Pending TX</CardTitle>
              <AlertTriangle className="h-3 w-3 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{liveData.systemMetrics.pendingTransactions}</div>
              <p className="text-xs text-muted-foreground">In queue</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="live-elections" className="space-y-4">
          <TabsList>
            <TabsTrigger value="live-elections">Live Elections</TabsTrigger>
            <TabsTrigger value="demographics">Voter Demographics</TabsTrigger>
            <TabsTrigger value="patterns">Voting Patterns</TabsTrigger>
            <TabsTrigger value="performance">System Performance</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="live-elections" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Live Election Monitoring</h2>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 animate-pulse">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
                  Live
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {liveData.currentElections.map((election: any) => (
                <Card key={election.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{election.title}</CardTitle>
                        <CardDescription className="mt-2">
                          Time remaining: {election.timeRemaining}
                        </CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Voter Turnout</span>
                        <span className="font-semibold">{election.turnout}%</span>
                      </div>
                      <Progress value={election.turnout} className="h-3" />
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>{election.votesCast.toLocaleString()} votes</span>
                        <span>{election.totalVoters.toLocaleString()} registered</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{election.recentVotes}</div>
                        <div className="text-xs text-gray-600">Votes in last hour</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {Math.round(election.votesCast / election.totalVoters * 100)}%
                        </div>
                        <div className="text-xs text-gray-600">Participation rate</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-4">
            <h2 className="text-xl font-semibold">Voter Demographics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>By Age Group</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(liveData.voterDemographics.byAge).map(([age, percentage]) => (
                    <div key={age}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{age}</span>
                        <span>{percentage}%</span>
                      </div>
                      <Progress value={percentage as number} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>By Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(liveData.voterDemographics.byLocation).map(([location, percentage]) => (
                    <div key={location}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {location}
                        </span>
                        <span>{percentage}%</span>
                      </div>
                      <Progress value={percentage as number} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            <h2 className="text-xl font-semibold">Voting Patterns</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity by Time of Day</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {liveData.votingPatterns.byTimeOfDay.map((timeData: any) => (
                    <div key={timeData.hour}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{timeData.hour}</span>
                        <span>{timeData.votes} votes</span>
                      </div>
                      <Progress 
                        value={(timeData.votes / Math.max(...liveData.votingPatterns.byTimeOfDay.map((d: any) => d.votes))) * 100} 
                        className="h-2" 
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Usage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(liveData.votingPatterns.byDevice).map(([device, percentage]) => (
                    <div key={device}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{device}</span>
                        <span>{percentage}%</span>
                      </div>
                      <Progress value={percentage as number} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <h2 className="text-xl font-semibold">System Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction Throughput</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {liveData.systemMetrics.transactionsPerMinute}
                  </div>
                  <p className="text-sm text-gray-600">Transactions per minute</p>
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span>12% increase from last hour</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Confirmation Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {liveData.systemMetrics.averageConfirmationTime}s
                  </div>
                  <p className="text-sm text-gray-600">Average confirmation time</p>
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span>5% faster than average</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {liveData.systemMetrics.successRate}%
                  </div>
                  <p className="text-sm text-gray-600">Success rate</p>
                  <div className="mt-4">
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Excellent
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <h2 className="text-xl font-semibold">Advanced Analytics Dashboard</h2>
            <div className="space-y-6">
              {/* Key Metrics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Votes Today</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from yesterday
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Voters</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">342</div>
                    <p className="text-xs text-muted-foreground">
                      Currently online
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <p className="text-xs text-muted-foreground">
                      Transaction success
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                    <Zap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1.2s</div>
                    <p className="text-xs text-muted-foreground">
                      Network latency
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Advanced Charts */}
              <VotingCharts />

              {/* Real-time Activity Feed */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Real-time Activity Feed
                  </CardTitle>
                  <CardDescription>
                    Live system and voting activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {[
                      { type: "vote", user: "0x742d...8a9c", action: "cast vote", election: "City Council Election", time: "2 minutes ago" },
                      { type: "verification", user: "0x8f9a...2b3c", action: "verified vote", election: "School Board Referendum", time: "5 minutes ago" },
                      { type: "registration", user: "0x1a2b...4c5d", action: "registered", election: "Upcoming Community Vote", time: "8 minutes ago" },
                      { type: "system", user: "System", action: "block mined", election: "Block #18457295", time: "12 minutes ago" },
                      { type: "security", user: "0x3e4f...6a7b", action: "2FA enabled", election: "Security Update", time: "15 minutes ago" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === "vote" ? "bg-green-500" :
                          activity.type === "verification" ? "bg-blue-500" :
                          activity.type === "registration" ? "bg-purple-500" :
                          activity.type === "system" ? "bg-gray-500" :
                          "bg-orange-500"
                        }`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">
                            {activity.user} {activity.action}
                          </div>
                          <div className="text-xs text-gray-600">
                            {activity.election} • {activity.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}