"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Use CSS custom properties for colors instead of hardcoded hex values
const getChartColors = () => {
  const style = getComputedStyle(document.documentElement);
  return {
    primary: style.getPropertyValue('--chart-1').trim(),
    secondary: style.getPropertyValue('--chart-2').trim(),
    tertiary: style.getPropertyValue('--chart-3').trim(),
    quaternary: style.getPropertyValue('--chart-4').trim(),
    quinary: style.getPropertyValue('--chart-5').trim(),
    success: style.getPropertyValue('--success').trim(),
    brand: style.getPropertyValue('--brand-medium').trim(),
  };
};

interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

interface VotingChartsProps {
  data?: {
    turnout?: ChartData[];
    demographics?: ChartData[];
    timeSeries?: ChartData[];
    results?: ChartData[];
  };
}

export function VotingCharts({ data }: VotingChartsProps) {
  // Mock data for demonstration
  const mockTurnoutData = [
    { name: 'District 1', turnout: 75, registered: 5000 },
    { name: 'District 2', turnout: 68, registered: 4500 },
    { name: 'District 3', turnout: 82, registered: 5200 },
    { name: 'District 4', turnout: 71, registered: 4800 },
    { name: 'District 5', turnout: 79, registered: 5100 },
  ];

  const mockDemographicsData = [
    { name: '18-25', value: 15 },
    { name: '26-35', value: 25 },
    { name: '36-45', value: 20 },
    { name: '46-55', value: 18 },
    { name: '56-65', value: 15 },
    { name: '65+', value: 7 },
  ];

  const mockTimeSeriesData = [
    { time: '6AM', votes: 45 },
    { time: '9AM', votes: 234 },
    { time: '12PM', votes: 567 },
    { time: '3PM', votes: 445 },
    { time: '6PM', votes: 678 },
    { time: '9PM', votes: 234 },
  ];

  const mockResultsData = [
    { name: 'Sarah Johnson', votes: 4850, percentage: 39 },
    { name: 'Michael Chen', votes: 4200, percentage: 34 },
    { name: 'Lisa Rodriguez', votes: 3400, percentage: 27 },
  ];

  const turnoutData = data?.turnout || mockTurnoutData;
  const demographicsData = data?.demographics || mockDemographicsData;
  const timeSeriesData = data?.timeSeries || mockTimeSeriesData;
  const resultsData = data?.results || mockResultsData;

  // Get colors dynamically
  const colors = getChartColors();
  const PIE_COLORS = [colors.primary, colors.secondary, colors.tertiary, colors.quaternary, colors.quinary, colors.success];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Voter Turnout by District */}
      <Card>
        <CardHeader>
          <CardTitle>Voter Turnout by District</CardTitle>
          <CardDescription>Percentage of registered voters who participated</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={turnoutData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  `${value}%`, 
                  name === 'turnout' ? 'Turnout Rate' : name
                ]}
              />
              <Bar dataKey="turnout" fill={colors.brand} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Voter Demographics */}
      <Card>
        <CardHeader>
          <CardTitle>Voter Age Demographics</CardTitle>
          <CardDescription>Breakdown of voters by age group</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={demographicsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill={colors.primary}
                dataKey="value"
              >
                {demographicsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Voting Activity Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Voting Activity Over Time</CardTitle>
          <CardDescription>Number of votes cast throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="votes" stroke={colors.success} fill={colors.success} fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Election Results */}
      <Card>
        <CardHeader>
          <CardTitle>Election Results</CardTitle>
          <CardDescription>Vote distribution by candidate</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resultsData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'votes' ? `${value.toLocaleString()} votes` : `${value}%`,
                  name === 'votes' ? 'Total Votes' : 'Percentage'
                ]}
              />
              <Bar dataKey="votes" fill={colors.tertiary} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}