import { Profile,columns } from "./columns";
import { DataTable } from "./data-table";
import prisma from "@/lib/db";

const ProfilesPage = async () => {
  // const data = await getProfile();
  const data = await prisma.initial_profiles.findMany({
    select: {
      id: true,
      username: true,
      biography: true,
      phone: true,
      email: true,
      website: true,
      category: true,
      brands: true,
      is_verified: true,
      followers_count: true,
      social_media: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Profiles</h1>
      </div>
      <DataTable columns={columns} data={data}/>
    </div>
  );
};

export default ProfilesPage;
