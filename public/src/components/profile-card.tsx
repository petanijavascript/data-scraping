"use client";

import * as React from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, XAxis } from 'recharts';

import { classifyProfileAction } from '@/app/actions';
import type { Profile } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { InstagramIcon, TikTokIcon } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const chartConfig = {
  followers: {
    label: 'Followers',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function ProfileCard({ profile }: { profile: Profile }) {
  const [isClassifying, setIsClassifying] = React.useState(false);
  const [classification, setClassification] = React.useState<{
    category: string;
    confidence: number;
  } | null>(null);
  const { toast } = useToast();

  const handleClassify = async () => {
    setIsClassifying(true);
    const formData = new FormData();
    formData.append('profileDescription', profile.description);
    formData.append('profileKeywords', profile.keywords.join(','));

    const result = await classifyProfileAction(formData);

    if (result.success && result.data) {
      setClassification(result.data);
      toast({
        title: 'Classification Successful',
        description: `Profile ${profile.username} classified as ${result.data.category}.`,
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Classification Failed',
        description: result.error,
      });
    }
    setIsClassifying(false);
  };

  const PlatformIcon =
    profile.platform === 'instagram' ? InstagramIcon : TikTokIcon;

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4">
        <Avatar className="w-12 h-12 border">
          <AvatarImage
            src={profile.avatar.imageUrl}
            alt={profile.username}
            data-ai-hint={profile.avatar.imageHint}
          />
          <AvatarFallback>
            {profile.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <CardTitle>{profile.username}</CardTitle>
            {profile.verified && <CheckCircle className="w-5 h-5 text-accent" />}
            <PlatformIcon className="w-5 h-5 ml-auto text-muted-foreground" />
          </div>
          <CardDescription className="mt-1 line-clamp-2">
            {profile.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Followers</p>
            <p className="font-bold">
              {(profile.followers / 1000).toFixed(1)}k
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Engagement</p>
            <p className="font-bold">{profile.engagementRate}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Avg. Views</p>
            <p className="font-bold">
              {(profile.avgViews / 1000000).toFixed(1)}m
            </p>
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-medium text-muted-foreground">
            Follower Growth
          </h4>
          <ChartContainer config={chartConfig} className="h-[80px] w-full">
            <LineChart
              accessibilityLayer
              data={profile.growthHistory}
              margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" hideLabel />}
              />
              <Line
                dataKey="followers"
                type="natural"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>

        <div>
          <h4 className="text-sm font-medium text-muted-foreground">
            Brand Collaborations
          </h4>
          <div className="flex flex-wrap gap-1 mt-2">
            {profile.brandCollaborations.map(brand => (
              <Badge key={brand} variant="secondary">
                {brand}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch gap-2">
        {classification ? (
          <div className="p-3 text-center border rounded-md bg-secondary/50">
            <p className="text-sm font-medium text-secondary-foreground">
              Category:{' '}
              <span className="font-bold text-primary">
                {classification.category}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Confidence: {Math.round(classification.confidence * 100)}%
            </p>
          </div>
        ) : (
          <Button onClick={handleClassify} disabled={isClassifying}>
            <Sparkles className="w-4 h-4 mr-2" />
            {isClassifying ? 'Classifying...' : 'Classify with AI'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
