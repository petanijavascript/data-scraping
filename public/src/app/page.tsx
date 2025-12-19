import { BarChart2, CheckCircle, Users, HardDrive } from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { StatsCard } from '@/components/stats-card';
import { ProfileForm } from '@/components/profile-form';
import { ProfileCard } from '@/components/profile-card';
import { profiles, stats } from '@/lib/data';
import { Button } from '@/components/ui/button';

function formatNumber(num: number) {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }
  return num.toString();
}

export default function Home() {
  return (
    <DashboardLayout>
      <div className="grid gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Profiles"
            value={stats.totalProfiles}
            icon={Users}
          />
          <StatsCard
            title="Total Followers"
            value={formatNumber(stats.totalFollowers)}
            icon={BarChart2}
          />
          <StatsCard
            title="Avg. Engagement"
            value={`${stats.avgEngagement}%`}
            icon={CheckCircle}
          />
          <StatsCard
            title="Data Source"
            value="Google Sheets"
            icon={HardDrive}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <ProfileForm />
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                Tracked Profiles
              </h2>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  Daily refresh enabled
                </p>
                <Button variant="outline" disabled>Sync to Sheets</Button>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {profiles.map(profile => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
