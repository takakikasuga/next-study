import { SearchBar } from "@/app/components/SearchBar";
import React, { FC } from "react";

export const Header: FC = () => {
  return (
    <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
      <SearchBar />
    </div>
  );
};
