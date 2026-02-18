"use client";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const page = () => {
  const { user } = useUser();
  const { data, isLoading, error } = useQuery({
    queryKey: ["communities"],
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([{ id: 1, name: "Community 1 " }]);
        });
      });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error:{error.message}</div>;
  }

  return (
    <div className="page-wrapper">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome Back,{user?.firstName || "User"} !
        </p>
      </div>
      <div>
        {data &&
          data.map((community: { id: number; name: string }) => (
            <p key={community.id}>{community.name}</p>
          ))}
      </div>
    </div>
  );
};

export default page;
