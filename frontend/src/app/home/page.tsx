import AppShell from "@/components/layout/AppShell";
import HomeDashboard from "./HomeDashboard"; // We will extract the home logic here

export default function HomePage() {
  return (
    <AppShell>
      <HomeDashboard />
    </AppShell>
  );
}
