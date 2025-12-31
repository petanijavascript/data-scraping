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

export type SocialMedia = {
  id: number;
  name: string;
};

export type Profile = {
  id: string;
  social_media: SocialMedia;
  username: string;
  biography: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  category: string | null;
  brands: string | null;
  is_verified: number;
  followers_count: number | null;
};

export const columns: ColumnDef<Profile>[] = [
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
    accessorKey: "username",
    header: "User",
  },
  {
    accessorKey: "social_media",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Social Media
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const socialMedia = row.getValue("social_media") as SocialMedia;

      return (
        <div className="p-1 rounded-md w-max text-xs bg-blue-500/40">
          {socialMedia?.name || "N/A"}
        </div>
      );
    },
  },
  {
    accessorKey: "biography",
    header: "Biography",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "website",
    header: "Website",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "brands",
    header: "Brands",
  },
  {
    accessorKey: "is_verified",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("is_verified") as number;

      return (
        <div
          className={cn(
            `p-1 rounded-md w-max text-xs`,
            status === 0 && "bg-yellow-500/40",
            status === 1 && "bg-green-500/40"
          )}
        >
          {status === 0 ? "Not Verified" : "Verified"}
        </div>
      );
    },
  },
  {
    accessorKey: "followers_count",
    header: () => <div className="text-right">Followers</div>,
    cell: ({ row }) => {
      const followers_count = row.getValue("followers_count") as number | null;
      // const formatted = new Intl.NumberFormat("en-US", {
      //   style: "currency",
      //   currency: "USD",
      // }).format(followers_count);

      return <div className="text-right font-medium">{followers_count ?? "-"}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const profile = row.original;

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
              onClick={() => navigator.clipboard.writeText(profile.id)}
            >
              Copy profile ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View profile details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
