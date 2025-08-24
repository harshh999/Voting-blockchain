"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  Vote, 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Copy,
  ExternalLink,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VotePage() {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<"idle" | "pending" | "confirmed" | "failed">("idle");
  const [transactionHash, setTransactionHash] = useState("");
  const [voteId, setVoteId] = useState("");
  const { toast } = useToast();

  // Mock election data
  const election = {
    id: 1,
    title: "City Council Election 2024",
    description: "Vote for your preferred city council representatives",
    deadline: "2024-12-15",
    totalVoters: 15000,
    votesCast: 8750,
    categories: [
      {
        name: "Mayor",
        candidates: [
          { id: "mayor-1", name: "Sarah Johnson", party: "Progressive Alliance", description: "Experienced leader with focus on education and healthcare" },
          { id: "mayor-2", name: "Michael Chen", party: "Citizens First", description: "Business leader advocating for economic growth" },
          { id: "mayor-3", name: "Lisa Rodriguez", party: "Green Future", description: "Environmental champion with urban development expertise" }
        ]
      },
      {
        name: "District 1",
        candidates: [
          { id: "dist1-1", name: "James Wilson", party: "Progressive Alliance", description: "Community organizer focused on neighborhood improvement" },
          { id: "dist1-2", name: "Amanda Foster", party: "Citizens First", description: "Small business owner advocating for local commerce" }
        ]
      },
      {
        name: "District 2",
        candidates: [
          { id: "dist2-1", name: "Robert Taylor", party: "Progressive Alliance", description: "Veteran and community advocate" },
          { id: "dist2-2", name: "Maria Garcia", party: "Citizens First", description: "Education professional and parent advocate" }
        ]
      },
      {
        name: "District 3",
        candidates: [
          { id: "dist3-1", name: "David Kim", party: "Progressive Alliance", description: "Tech entrepreneur and innovation advocate" },
          { id: "dist3-2", name: "Jennifer Brown", party: "Citizens First", description: "Healthcare professional and community volunteer" }
        ]
      }
    ]
  };

  const handleSubmitVote = async () => {
    if (!selectedCandidate) {
      toast({
        title: "No Selection",
        description: "Please select a candidate before submitting your vote.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setTransactionStatus("pending");

    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock transaction hash and vote ID
      const mockTxHash = "0x" + Math.random().toString(16).substr(2, 64);
      const mockVoteId = "VC-" + new Date().toISOString().slice(0, 10).replace(/-/g, "") + "-" + Math.random().toString(36).substr(2, 6).toUpperCase();
      
      setTransactionHash(mockTxHash);
      setVoteId(mockVoteId);
      setTransactionStatus("confirmed");
      
      toast({
        title: "Vote Cast Successfully!",
        description: "Your vote has been recorded on the blockchain.",
      });
    } catch (error) {
      setTransactionStatus("failed");
      toast({
        title: "Transaction Failed",
        description: "Failed to cast vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "Transaction hash copied to clipboard.",
    });
  };

  const getProgressPercentage = () => {
    return Math.round((election.votesCast / election.totalVoters) * 100);
  };

  if (transactionStatus === "confirmed") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Vote Successfully Cast!</CardTitle>
            <CardDescription>
              Your vote has been immutably recorded on the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Save your Vote ID:</strong> {voteId}
                <br />
                Use this ID to verify your vote was counted without revealing your choice.
              </AlertDescription>
            </Alert>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Transaction Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Transaction Hash:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{transactionHash.slice(0, 20)}...</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(transactionHash)}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Block Number:</span>
                  <span>#18,457,292</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => window.open(`https://etherscan.io/tx/${transactionHash}`, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View on Explorer
              </Button>
              <Button 
                className="flex-1"
                onClick={() => window.location.href = '/dashboard'}
              >
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" asChild>
              <a href="/dashboard" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Election Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="default" className="bg-green-100 text-green-800">
              Active
            </Badge>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              Deadline: {election.deadline}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{election.title}</h1>
          <p className="text-gray-600">{election.description}</p>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Voter Turnout</span>
              <span>{getProgressPercentage()}%</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
            <p className="text-xs text-gray-600 mt-1">
              {election.votesCast.toLocaleString()} of {election.totalVoters.toLocaleString()} voters have cast their ballots
            </p>
          </div>
        </div>

        {/* Transaction Status */}
        {transactionStatus === "pending" && (
          <Alert className="mb-6 border-blue-200 bg-blue-50">
            <Loader2 className="h-4 w-4 animate-spin" />
            <AlertDescription>
              <strong>Transaction Pending:</strong> Your vote is being processed on the blockchain. 
              Please do not close this page until the transaction is confirmed.
            </AlertDescription>
          </Alert>
        )}

        {transactionStatus === "failed" && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Transaction Failed:</strong> Your vote could not be processed. 
              Please try again.
            </AlertDescription>
          </Alert>
        )}

        {/* Voting Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="h-5 w-5" />
              Cast Your Vote
            </CardTitle>
            <CardDescription>
              Select your preferred candidate for each position
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {election.categories.map((category) => (
              <div key={category.name} className="space-y-4">
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <RadioGroup value={selectedCandidate} onValueChange={setSelectedCandidate}>
                  {category.candidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={candidate.id} id={candidate.id} />
                      <div className="flex-1">
                        <Label htmlFor={candidate.id} className="flex flex-col space-y-1 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{candidate.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {candidate.party}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{candidate.description}</p>
                        </Label>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-center">
          <Button 
            onClick={handleSubmitVote}
            disabled={isSubmitting || !selectedCandidate || transactionStatus === "pending"}
            size="lg"
            className="px-8"
          >
            {isSubmitting || transactionStatus === "pending" ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {transactionStatus === "pending" ? "Processing Transaction..." : "Submitting Vote..."}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Cast Vote on Blockchain
              </div>
            )}
          </Button>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
            <Shield className="h-4 w-4 text-green-600" />
            <span>Your vote is encrypted and securely recorded on the blockchain</span>
          </div>
        </div>
      </main>
    </div>
  );
}