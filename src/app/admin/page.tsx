"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  Fingerprint,
  ArrowRight,
  Building2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate initial login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, show 2FA step
      if (!showTwoFactor) {
        setShowTwoFactor(true);
        toast({
          title: "Verification Required",
          description: "Please enter your two-factor authentication code.",
        });
        return;
      }
      
      // Simulate 2FA verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Login Successful",
        description: "Welcome to the Admin Portal!",
      });
      
      // Redirect to admin dashboard
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Security Warning */}
        <Alert className="mb-6 border-orange-200 bg-orange-50 text-orange-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Authorized Access Only:</strong> This is a secure administrative portal. 
            Unauthorized access attempts will be logged and may result in legal action.
          </AlertDescription>
        </Alert>

        {/* Admin Portal Card */}
        <Card className="shadow-2xl border-gray-200">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="relative">
                <Building2 className="h-12 w-12 text-blue-600" />
                <Shield className="h-6 w-6 text-green-600 absolute -bottom-1 -right-1" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription className="text-gray-600">
                Secure access for election officials and administrators
              </CardDescription>
            </div>
            <div className="flex justify-center">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Fingerprint className="h-3 w-3 mr-1" />
                Multi-Factor Authentication
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Admin Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="adminEmail"
                    type="email"
                    placeholder="admin@election.gov"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminPassword">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="adminPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {showTwoFactor && (
                <div className="space-y-2">
                  <Label htmlFor="twoFactorCode">Two-Factor Authentication Code</Label>
                  <div className="relative">
                    <Fingerprint className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="twoFactorCode"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={twoFactorCode}
                      onChange={(e) => setTwoFactorCode(e.target.value)}
                      className="pl-10 text-center font-mono text-lg tracking-widest"
                      maxLength={6}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-600">
                    Enter the code from your authenticator app or SMS
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-600">Remember this device</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button 
                type="submit"
                disabled={isLoading || !email || !password || (showTwoFactor && !twoFactorCode)}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {showTwoFactor ? "Verifying..." : "Authenticating..."}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    {showTwoFactor ? "Verify & Access Portal" : "Secure Login"}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-gray-900">Security Features:</h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-green-600" />
                    <span>End-to-end encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-green-600" />
                    <span>Multi-factor authentication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-green-600" />
                    <span>Session timeout protection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-green-600" />
                    <span>Audit logging for all actions</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Not an administrator?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Voter Login
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-gray-400">
            <Shield className="h-4 w-4" />
            <span>Protected by blockchain security protocols</span>
          </div>
        </div>
      </div>
    </div>
  );
}