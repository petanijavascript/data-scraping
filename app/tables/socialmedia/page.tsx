import { columns } from "./columns";
import { DataTable } from "./data-table";
import prisma from "@/lib/db";

const SocialPage = async () => {
  // const data = await getProfile();
  const data = await prisma.social_media.findMany();
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Social Media</h1>
      </div>
      <DataTable columns={columns} data={data}/>
    </div>
  );
};

export default SocialPage;
