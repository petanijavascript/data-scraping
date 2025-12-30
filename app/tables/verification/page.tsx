import { columns } from "./columns";
import { DataTable } from "./data-table";
import prisma from "@/lib/db";

const VerificationPage = async () => {
  // const data = await getProfile();
  const data = await prisma.verification_logs.findMany();
  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Verification History</h1>
      </div>
      <DataTable columns={columns} data={data}/>
    </div>
  );
};

export default VerificationPage;
