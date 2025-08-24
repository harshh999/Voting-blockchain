"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Hash, 
  Clock, 
  Users, 
  ExternalLink, 
  RefreshCw,
  ArrowUpRight,
  Database,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlockData {
  number: number;
  hash: string;
  timestamp: string;
  transactionCount: number;
  gasUsed: number;
  miner: string;
}

export function BlockchainExplorer() {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const { toast } = useToast();

  // Mock blockchain data
  const generateMockBlocks = (): BlockData[] => {
    const baseBlockNumber = 18457292;
    const mockBlocks: BlockData[] = [];
    
    for (let i = 0; i < 5; i++) {
      mockBlocks.push({
        number: baseBlockNumber + i,
        hash: "0x" + Math.random().toString(16).substr(2, 64),
        timestamp: new Date(Date.now() - i * 15000).toISOString(),
        transactionCount: Math.floor(Math.random() * 50) + 10,
        gasUsed: Math.floor(Math.random() * 15000000) + 5000000,
        miner: "0x" + Math.random().toString(16).substr(2, 40)
      });
    }
    
    return mockBlocks.reverse();
  };

  const loadLatestBlocks = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockBlocks = generateMockBlocks();
      setBlocks(mockBlocks);
      setLastUpdated(new Date());
    } catch (error) {
      toast({
        title: "Failed to Load Blocks",
        description: "Unable to fetch latest blockchain data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLatestBlocks();
    const interval = setInterval(loadLatestBlocks, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const viewOnExplorer = (blockNumber: number) => {
    window.open(`https://etherscan.io/block/${blockNumber}`, '_blank');
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="h-5 w-5 text-blue-600" />
              Blockchain Explorer
            </CardTitle>
            <CardDescription className="text-sm">
              Latest blocks on the VoteChain network
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-100 text-green-800 animate-pulse">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
              Live
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={loadLatestBlocks}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {blocks.length === 0 ? (
          <div className="text-center py-8">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-sm text-gray-600">Loading blockchain data...</p>
          </div>
        ) : (
          <>
            {blocks.map((block, index) => (
              <div 
                key={block.hash} 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  index === 0 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                } hover:bg-gray-100 transition-colors`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {index === 0 ? (
                      <Zap className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Hash className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="font-mono text-sm font-medium">
                      #{block.number.toLocaleString()}
                    </span>
                    {index === 0 && (
                      <Badge variant="secondary" className="text-xs">
                        Latest
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      <span>{block.transactionCount} tx</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(block.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-500 text-right hidden sm:block">
                    <div>Miner: {formatAddress(block.miner)}</div>
                    <div>Gas: {Math.round(block.gasUsed / 1000000)}M</div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => viewOnExplorer(block.number)}
                    className="h-8 w-8 p-0"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Database className="h-3 w-3" />
                  <span>Network: VoteChain Mainnet</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}