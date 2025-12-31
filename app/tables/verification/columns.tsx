"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// export type Profile = {
//   id: string;
//   amount: number;
//   username: string;
//   email: string;
//   status: "pending" | "processing" | "success" | "failed";
// };

<<<<<<< HEAD
export type Verification = {
  id: string;
  initial_profiles_id: string;
=======
export type InitialProfiles = {
   id: string;
   username: string;
   email: string | null;
   biography: string | null;
   is_verified: number;
};

export type Verification = {
  id: string;
  initial_profiles: InitialProfiles;
>>>>>>> data-scraping-dev
  verification_status: number | null;
  created_at: Date;
};

export const columns: ColumnDef<Verification>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        checked={row.getIsSelected()}
      />
    ),
  },
  {
<<<<<<< HEAD
    accessorKey: "username",
    header: "User",
  },
  {
    accessorKey: "verification_status",
    header: "Status",
=======
    accessorKey: "initial_profiles",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const profile = row.getValue("initial_profiles") as InitialProfiles;

      return (profile?.username || "N/A");
    },
  },
  {
    accessorKey: "verification_status",
    header: "Badge",
>>>>>>> data-scraping-dev
    cell: ({ row }) => {
      const status = row.getValue("verification_status") as number | null;

      return (
        <div
          className={cn(
            `p-1 rounded-md w-max text-xs`,
            status === 0 && "bg-yellow-500/40",
            status === 1 && "bg-green-500/40"
          )}
        >
<<<<<<< HEAD
          {status?.toString() || "N/A"}
=======
          {status === 0 ? "Not Verified" : "Blue Tick"}
>>>>>>> data-scraping-dev
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const verification = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(verification.id)}
            >
              Copy verification ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View profile details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
