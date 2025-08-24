"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Shield, Lock, Users, BarChart3, CheckCircle, ArrowRight, Globe, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light/10 to-success/10">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-foreground">VoteChain</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" asChild>
                <a href="/login">Login</a>
              </Button>
              <Button asChild>
                <a href="/register">Register</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Secure • Transparent • Immutable
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Revolutionizing Democracy with
            <span className="text-primary"> Blockchain Technology</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            VoteChain brings trust, security, and transparency to elections through cutting-edge blockchain technology. 
            Every vote is securely recorded, verifiable, and tamper-proof.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="/register">Start Voting <ArrowRight className="ml-2 h-5 w-5" /></a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <a href="#how-it-works">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How VoteChain Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, secure, and transparent voting in just a few steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>1. Register</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create your secure account with Web3 wallet integration for identity verification
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
                <CardTitle>2. Verify</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Confirm your eligibility and access elections you're qualified to participate in
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-brand-medium/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-brand-medium" />
                </div>
                <CardTitle>3. Vote</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cast your vote securely with a single click, recorded immutably on the blockchain
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-warning" />
                </div>
                <CardTitle>4. Verify</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive a unique ID to verify your vote was counted without compromising privacy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Benefits of Blockchain Voting
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Why VoteChain represents the future of secure democratic processes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Lock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Immutability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Once votes are recorded on the blockchain, they cannot be altered or deleted, 
                  ensuring permanent and tamper-proof election records.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Globe className="h-12 w-12 text-success mb-4" />
                <CardTitle>Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Anyone can verify the integrity of the election process while maintaining 
                  voter privacy through cryptographic proofs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-12 w-12 text-brand-medium mb-4" />
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Advanced cryptographic techniques protect against fraud, double voting, 
                  and unauthorized access to sensitive voting data.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="h-12 w-12 text-warning mb-4" />
                <CardTitle>Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Near-instant vote counting and results reporting eliminate delays 
                  and reduce costs associated with traditional elections.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-destructive mb-4" />
                <CardTitle>Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Vote from anywhere with an internet connection, increasing voter turnout 
                  and making democracy more accessible to all citizens.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-12 w-8 text-info mb-4" />
                <CardTitle>Auditability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete audit trail with cryptographic verification ensures 
                  every vote can be independently verified and validated.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about VoteChain and blockchain voting
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How secure is blockchain voting compared to traditional methods?</AccordionTrigger>
              <AccordionContent>
                Blockchain voting is significantly more secure than traditional methods. It uses advanced cryptography, 
                decentralized validation, and immutable records to prevent fraud, tampering, and unauthorized access. 
                Each vote is cryptographically signed and verified across multiple nodes in the network.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Can my vote be traced back to me?</AccordionTrigger>
              <AccordionContent>
                No. VoteChain uses zero-knowledge proofs and other privacy-preserving technologies to ensure 
                your vote remains anonymous. While you can verify that your vote was counted, no one can 
                determine how you voted, maintaining the secret ballot principle.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What happens if I lose my internet connection while voting?</AccordionTrigger>
              <AccordionContent>
                Your vote is only recorded on the blockchain once the transaction is confirmed. If you lose 
                connection during the process, you can simply restart the voting process. The system prevents 
                double voting through cryptographic mechanisms, so you won't be able to vote twice.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How do I verify my vote was counted correctly?</AccordionTrigger>
              <AccordionContent>
                After voting, you'll receive a unique, anonymized vote ID. You can use this ID on our 
                verification page to confirm your vote was recorded on the blockchain without revealing 
                your identity or voting choice.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>What blockchain technology does VoteChain use?</AccordionTrigger>
              <AccordionContent>
                VoteChain is built on a secure, EVM-compatible blockchain that balances security, speed, 
                and accessibility. The platform uses smart contracts to enforce voting rules and ensure 
                the integrity of the electoral process.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary to-success">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Experience the Future of Voting?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Join thousands of voters who are already using VoteChain for secure, transparent elections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="/register">Register to Vote</a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <a href="/admin">Election Administrator Portal</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted text-muted-foreground py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold text-foreground">VoteChain</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-muted-foreground">
                © 2024 VoteChain. Securing democracy through blockchain technology.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}