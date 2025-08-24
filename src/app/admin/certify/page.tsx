"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  CheckCircle, 
  FileText, 
  Download, 
  Eye, 
  AlertTriangle,
  Clock,
  Users,
  Vote,
  Hash,
  Calendar,
  Award,
  Stamp,
  ExternalLink,
  Copy
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AdminCertifyPage() {
  const [selectedElection, setSelectedElection] = useState<any>(null);
  const [isCertifying, setIsCertifying] = useState(false);
  const [certificationComplete, setCertificationComplete] = useState(false);
  const [certificationHash, setCertificationHash] = useState("");
  const { toast } = useToast();

  // Mock completed elections ready for certification
  const completedElections = [
    {
      id: 1,
      title: "City Council Election 2024",
      endDate: "2024-12-15",
      totalVoters: 15000,
      votesCast: 12450,
      turnout: 83.0,
      candidates: 12,
      status: "completed",
      auditStatus: "passed",
      finalResults: {
        "Sarah Johnson": 4850,
        "Michael Chen": 4200,
        "Lisa Rodriguez": 3400
      },
      issues: [],
      blockchainHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f8e8A9c"
    },
    {
      id: 2,
      title: "School Board Referendum",
      endDate: "2024-12-20",
      totalVoters: 12000,
      votesCast: 9800,
      turnout: 81.7,
      candidates: 2,
      status: "completed",
      auditStatus: "passed",
      finalResults: {
        "For": 6200,
        "Against": 3600
      },
      issues: [],
      blockchainHash: "0x8a9c742d35Cc6634C0532925a3b844Bc9e7595f8e"
    }
  ];

  // Mock certified elections
  const certifiedElections = [
    {
      id: 3,
      title: "State Primary Election",
      certificationDate: "2024-11-10",
      totalVoters: 25000,
      votesCast: 18750,
      turnout: 75.0,
      certificationHash: "0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890",
      blockNumber: 18457292,
      status: "certified"
    }
  ];

  const handleCertifyElection = async (election: any) => {
    setSelectedElection(election);
    setIsCertifying(true);
    
    try {
      // Simulate certification process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock certification hash
      const mockCertHash = "0x" + Math.random().toString(16).substr(2, 64);
      setCertificationHash(mockCertHash);
      setCertificationComplete(true);
      
      toast({
        title: "Election Certified Successfully",
        description: "The election has been certified and results are now final.",
      });
    } catch (error) {
      toast({
        title: "Certification Failed",
        description: "Failed to certify election. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCertifying(false);
    }
  };

  const handleDownloadCertificate = (election: any) => {
    toast({
      title: "Downloading Certificate",
      description: "Election certificate is being prepared for download.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "Hash copied to clipboard.",
    });
  };

  const viewOnExplorer = (hash: string) => {
    window.open(`https://etherscan.io/tx/${hash}`, '_blank');
  };

  if (certificationComplete && selectedElection) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <Button variant="ghost" asChild>
                <a href="/admin/certify" className="flex items-center gap-2">
                  Back to Elections
                </a>
              </Button>
            </div>
          </div>
        </header>

        {/* Success Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">Election Certified Successfully!</CardTitle>
              <CardDescription className="text-lg">
                {selectedElection.title} has been officially certified and results are final
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Certification Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">Election Title</Label>
                    <p className="font-medium">{selectedElection.title}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Certification Date</Label>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Total Votes Cast</Label>
                    <p className="font-medium">{selectedElection.votesCast.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Voter Turnout</Label>
                    <p className="font-medium">{selectedElection.turnout}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">Blockchain Certification</h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-gray-600">Certification Hash</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="font-mono text-sm bg-gray-100 px-3 py-2 rounded flex-1">
                        {certificationHash.slice(0, 42)}...
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(certificationHash)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewOnExplorer(certificationHash)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Block Number</Label>
                    <p className="font-medium">#{(18457292 + Math.floor(Math.random() * 100)).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={() => handleDownloadCertificate(selectedElection)}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = "/admin/certify"}
                  className="flex-1"
                >
                  Certify Another Election
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">VoteChain Admin</span>
            </div>
            <div className="ml-auto">
              <nav className="flex space-x-4">
                <a href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a>
                <a href="/admin/analytics" className="text-gray-600 hover:text-gray-900">Analytics</a>
                <a href="/admin/certify" className="text-blue-600 font-medium">Certification</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Election Certification</h1>
          <p className="text-gray-600 mt-2">
            Review, audit, and certify completed elections to finalize results
          </p>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending">Pending Certification</TabsTrigger>
            <TabsTrigger value="certified">Certified Elections</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Elections Ready for Certification</h2>
              <Badge className="bg-orange-100 text-orange-800">
                {completedElections.length} elections pending
              </Badge>
            </div>

            <div className="space-y-6">
              {completedElections.map((election) => (
                <Card key={election.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl">{election.title}</CardTitle>
                          <Badge variant="secondary">Completed</Badge>
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Audit Passed
                          </Badge>
                        </div>
                        <CardDescription>
                          Election ended on {election.endDate}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{election.votesCast.toLocaleString()} of {election.totalVoters.toLocaleString()} voted</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Vote className="h-4 w-4" />
                            <span>{election.turnout}% turnout</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Results Summary */}
                    <div>
                      <h4 className="font-semibold mb-3">Final Results Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(election.finalResults).map(([candidate, votes]) => (
                          <div key={candidate} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{candidate}</span>
                              <span className="text-sm text-gray-600">{votes.toLocaleString()} votes</span>
                            </div>
                            <Progress 
                              value={(votes as number / election.votesCast) * 100} 
                              className="h-2" 
                            />
                            <div className="text-xs text-gray-600 mt-1">
                              {Math.round((votes as number / election.votesCast) * 100)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Audit Status */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h4 className="font-semibold text-green-800">Audit Status: Passed</h4>
                      </div>
                      <div className="text-sm text-green-700">
                        All blockchain transactions verified, no anomalies detected, 
                        and voter eligibility confirmed. The election meets all certification requirements.
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <Button 
                        onClick={() => handleCertifyElection(election)}
                        disabled={isCertifying}
                        className="flex-1"
                        size="lg"
                      >
                        {isCertifying ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Certifying...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Stamp className="h-4 w-4" />
                            Certify Election
                          </div>
                        )}
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        View Full Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certified" className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Certified Elections</h2>
              <Badge className="bg-green-100 text-green-800">
                {certifiedElections.length} elections certified
              </Badge>
            </div>

            <div className="space-y-6">
              {certifiedElections.map((election) => (
                <Card key={election.id} className="border-green-200 bg-green-50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl">{election.title}</CardTitle>
                          <Badge className="bg-green-100 text-green-800">
                            <Award className="h-3 w-3 mr-1" />
                            Certified
                          </Badge>
                        </div>
                        <CardDescription>
                          Certified on {election.certificationDate}
                        </CardDescription>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{election.votesCast.toLocaleString()} votes cast</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Hash className="h-4 w-4" />
                            <span>Block #{election.blockNumber.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Blockchain Certification</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Certification Hash:</span>
                          <span className="font-mono text-sm">{election.certificationHash.slice(0, 20)}...</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(election.certificationHash)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        onClick={() => handleDownloadCertificate(election)}
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Download Certificate
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => viewOnExplorer(election.certificationHash)}
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View on Blockchain
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}