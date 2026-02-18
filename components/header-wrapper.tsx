"use server";
import { auth } from "@clerk/nextjs/server";
import Header from "./header";

const Headerwrapper = async () => {
  const { has } = await auth();

  const isPro = has({ plan: "pro_plan" });
  return <Header isPro={isPro} />;
};

export default Headerwrapper;
