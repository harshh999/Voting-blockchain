"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  Copy,
  ExternalLink,
  Calendar,
  Hash,
  Database
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VerifyPage() {
  const [voteId, setVoteId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const { toast } = useToast();

  const handleVerify = async () => {
    if (!voteId.trim()) {
      toast({
        title: "Vote ID Required",
        description: "Please enter your vote ID to verify.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock verification result
      const mockResult = {
        status: "verified",
        voteId: voteId,
        electionTitle: "City Council Election 2024",
        voteDate: "2024-11-15",
        transactionHash: "0x742d35Cc6634C0532925a3b844Bc9e7595f8e8A9c",
        blockNumber: 18457292,
        blockTimestamp: "2024-11-15T14:30:25Z",
        confirmations: 15420,
        isRecorded: true,
        isUnique: true,
        isEligible: true
      };
      
      setVerificationResult(mockResult);
      toast({
        title: "Verification Complete",
        description: "Your vote has been successfully verified!",
      });
    } catch (error) {
      setVerificationResult({
        status: "error",
        message: "Failed to verify vote. Please check your vote ID and try again."
      });
      toast({
        title: "Verification Failed",
        description: "Unable to verify vote. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "Text copied to clipboard.",
    });
  };

  const viewOnExplorer = (txHash: string) => {
    window.open(`https://etherscan.io/tx/${txHash}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">VoteChain</span>
            </div>
            <Button variant="ghost" asChild>
              <a href="/dashboard" className="flex items-center gap-2">
                Back to Dashboard
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Vote Verification</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Verify that your vote was securely recorded on the blockchain without revealing your identity or voting choice
          </p>
        </div>

        {/* Verification Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Enter Your Vote ID
            </CardTitle>
            <CardDescription>
              Your Vote ID was provided when you cast your vote. It typically looks like: VC-YYYYMMDD-ABC123
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="voteId">Vote ID</Label>
              <Input
                id="voteId"
                placeholder="e.g., VC-20241115-ABC123"
                value={voteId}
                onChange={(e) => setVoteId(e.target.value)}
                className="text-lg font-mono"
              />
            </div>
            <Button 
              onClick={handleVerify}
              disabled={isVerifying || !voteId.trim()}
              className="w-full"
              size="lg"
            >
              {isVerifying ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Verify Vote
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Verification Result */}
        {verificationResult && (
          <Card className={verificationResult.status === "verified" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
            <CardHeader>
              <div className="flex items-center gap-2">
                {verificationResult.status === "verified" ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <CardTitle className="text-green-600">Vote Verified Successfully</CardTitle>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <CardTitle className="text-red-600">Verification Failed</CardTitle>
                  </>
                )}
              </div>
              <CardDescription>
                {verificationResult.status === "verified" 
                  ? "Your vote has been confirmed and recorded on the blockchain"
                  : verificationResult.message
                }
              </CardDescription>
            </CardHeader>
            
            {verificationResult.status === "verified" && (
              <CardContent className="space-y-6">
                {/* Verification Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-600">Recorded</span>
                    </div>
                    <p className="text-sm text-gray-600">Vote found on blockchain</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-600">Unique</span>
                    </div>
                    <p className="text-sm text-gray-600">No duplicate votes detected</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-600">Eligible</span>
                    </div>
                    <p className="text-sm text-gray-600">Voter eligibility confirmed</p>
                  </div>
                </div>

                {/* Transaction Details */}
                <div className="bg-white p-6 rounded-lg space-y-4">
                  <h3 className="font-semibold text-lg mb-4">Transaction Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm text-gray-600">Election</Label>
                        <p className="font-medium">{verificationResult.electionTitle}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Vote Date</Label>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <p className="font-medium">{verificationResult.voteDate}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Block Number</Label>
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4 text-gray-400" />
                          <p className="font-medium">#{verificationResult.blockNumber.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm text-gray-600">Transaction Hash</Label>
                        <div className="flex items-center gap-2">
                          <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded flex-1">
                            {verificationResult.transactionHash.slice(0, 20)}...
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(verificationResult.transactionHash)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => viewOnExplorer(verificationResult.transactionHash)}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Confirmations</Label>
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-gray-400" />
                          <p className="font-medium">{verificationResult.confirmations.toLocaleString()}</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Secure
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Vote ID</Label>
                        <div className="flex items-center gap-2">
                          <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded flex-1">
                            {verificationResult.voteId}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(verificationResult.voteId)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Privacy Protected:</strong> This verification confirms your vote was recorded 
                    without revealing your voting choice or personal identity. Your vote remains anonymous 
                    while being transparently verifiable.
                  </AlertDescription>
                </Alert>
              </CardContent>
            )}
          </Card>
        )}

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How Vote Verification Works</CardTitle>
            <CardDescription>
              Understand the process behind secure vote verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">Privacy-Preserving Verification</h4>
                <p className="text-sm text-gray-600">
                  The system uses cryptographic techniques to allow verification without compromising 
                  voter privacy. Your vote choice remains secret while proving it was counted.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Blockchain Immutability</h4>
                <p className="text-sm text-gray-600">
                  Once recorded, votes cannot be altered or deleted. The blockchain provides a 
                  permanent, tamper-proof record of all votes cast.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Real-time Confirmation</h4>
                <p className="text-sm text-gray-600">
                  Verification happens instantly by checking the blockchain. You can confirm your 
                  vote was recorded within seconds of casting it.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Public Auditability</h4>
                <p className="text-sm text-gray-600">
                  Anyone can verify the integrity of the election process. The blockchain provides 
                  complete transparency while maintaining individual privacy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}