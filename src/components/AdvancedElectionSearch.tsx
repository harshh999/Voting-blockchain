"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  Vote, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Eye,
  ArrowRight
} from "lucide-react";

interface Election {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "upcoming" | "draft";
  startDate: string;
  endDate: string;
  totalVoters: number;
  votesCast: number;
  categories: string[];
  type: "election" | "referendum";
  priority: "high" | "medium" | "low";
  issues?: number;
}

interface ElectionFilters {
  search: string;
  status: string;
  type: string;
  priority: string;
  sortBy: string;
}

export function AdvancedElectionSearch() {
  const [elections, setElections] = useState<Election[]>([
    {
      id: "1",
      title: "City Council Election 2024",
      description: "Vote for your preferred city council representatives",
      status: "active",
      startDate: "2024-11-01",
      endDate: "2024-12-15",
      totalVoters: 15000,
      votesCast: 8750,
      categories: ["Mayor", "District 1", "District 2", "District 3"],
      type: "election",
      priority: "high"
    },
    {
      id: "2",
      title: "School Board Referendum",
      description: "Approve the proposed school budget improvements",
      status: "active",
      startDate: "2024-11-15",
      endDate: "2024-12-20",
      totalVoters: 12000,
      votesCast: 3200,
      categories: ["For", "Against"],
      type: "referendum",
      priority: "medium",
      issues: 1
    },
    {
      id: "3",
      title: "State Primary Election",
      description: "Primary elections for state representatives",
      status: "completed",
      startDate: "2024-10-01",
      endDate: "2024-11-05",
      totalVoters: 25000,
      votesCast: 18750,
      categories: ["Governor", "Senate", "House"],
      type: "election",
      priority: "high"
    },
    {
      id: "4",
      title: "Community Center Funding",
      description: "Referendum for new community center construction",
      status: "upcoming",
      startDate: "2025-01-15",
      endDate: "2025-01-30",
      totalVoters: 18000,
      votesCast: 0,
      categories: ["Yes", "No"],
      type: "referendum",
      priority: "medium"
    },
    {
      id: "5",
      title: "School Board District 2",
      description: "Special election for school board member",
      status: "draft",
      startDate: "2025-02-01",
      endDate: "2025-02-15",
      totalVoters: 8000,
      votesCast: 0,
      categories: ["Candidate A", "Candidate B"],
      type: "election",
      priority: "low"
    }
  ]);

  const [filters, setFilters] = useState<ElectionFilters>({
    search: "",
    status: "all",
    type: "all",
    priority: "all",
    sortBy: "date"
  });

  const [showFilters, setShowFilters] = useState(false);

  const filteredElections = elections.filter(election => {
    const matchesSearch = election.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         election.description.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = filters.status === "all" || election.status === filters.status;
    const matchesType = filters.type === "all" || election.type === filters.type;
    const matchesPriority = filters.priority === "all" || election.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "turnout":
        return ((b.votesCast / b.totalVoters) * 100) - ((a.votesCast / a.totalVoters) * 100);
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case "date":
      default:
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    }
  });

  const getStatusBadge = (status: Election["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/20 text-success border-success/30">Active</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
      case "upcoming":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Upcoming</Badge>;
      case "draft":
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: Election["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">High</Badge>;
      case "medium":
        return <Badge className="bg-warning/20 text-warning border-warning/30">Medium</Badge>;
      case "low":
        return <Badge className="bg-muted text-muted-foreground">Low</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const getTurnoutPercentage = (votesCast: number, totalVoters: number) => {
    return totalVoters > 0 ? Math.round((votesCast / totalVoters) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Election Search & Filter</CardTitle>
              <CardDescription>
                Find and filter elections by various criteria
              </CardDescription>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search elections by title or description..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="pl-10"
            />
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Type</label>
                <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="election">Election</SelectItem>
                    <SelectItem value="referendum">Referendum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Priority</label>
                <Select value={filters.priority} onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Priorities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="turnout">Turnout</SelectItem>
                    <SelectItem value="priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {filteredElections.length} of {elections.length} elections
            </div>
            <div className="flex items-center gap-2">
              {filters.search && (
                <Badge variant="outline">
                  Search: {filters.search}
                </Badge>
              )}
              {filters.status !== "all" && (
                <Badge variant="outline">
                  Status: {filters.status}
                </Badge>
              )}
              {filters.type !== "all" && (
                <Badge variant="outline">
                  Type: {filters.type}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredElections.map((election) => (
          <Card key={election.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <CardTitle className="text-lg leading-tight">{election.title}</CardTitle>
                    {getStatusBadge(election.status)}
                    {getPriorityBadge(election.priority)}
                    {election.issues && election.issues > 0 && (
                      <Badge variant="destructive" className="bg-destructive/20 text-destructive border-destructive/30">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {election.issues} Issue{election.issues > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-sm">{election.description}</CardDescription>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{election.startDate} - {election.endDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Vote className="h-3 w-3" />
                      <span>{election.type === "election" ? "Election" : "Referendum"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-accent rounded-lg">
                  <div className="text-lg font-bold">{election.votesCast.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Votes Cast</div>
                </div>
                <div className="text-center p-3 bg-accent rounded-lg">
                  <div className="text-lg font-bold">{getTurnoutPercentage(election.votesCast, election.totalVoters)}%</div>
                  <div className="text-xs text-muted-foreground">Turnout</div>
                </div>
              </div>

              {/* Categories */}
              <div>
                <div className="text-sm font-medium mb-2">Categories:</div>
                <div className="flex flex-wrap gap-1">
                  {election.categories.map((category, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => window.location.href = `/election/${election.id}`}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View Details
                </Button>
                {election.status === "active" && (
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.location.href = `/vote?id=${election.id}`}
                  >
                    Vote Now
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredElections.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No elections found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters to find what you're looking for.
            </p>
            <Button 
              variant="outline" 
              onClick={() => setFilters({ search: "", status: "all", type: "all", priority: "all", sortBy: "date" })}
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}