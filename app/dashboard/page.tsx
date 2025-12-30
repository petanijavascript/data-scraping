import prisma from "@/lib/db";
import AppAreaChart from "@/components/deck/package/AppAreaChart";
import AppBarChart from "@/components/deck/package/AppBarChart";
import AppPieChart from "@/components/deck/package/AppPieChart";
import CardList from "@/components/deck/package/CardList";
import TodoList from "@/components/deck/package/TodoList";

export default async function Home() {
  
  return (
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="Most Popular" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>
      {/* <div className="bg-primary-foreground p-4 rounded-lg"><TodoList/></div> */}
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <CardList title="Popular Content" />
      </div>
    </div>
  )
}