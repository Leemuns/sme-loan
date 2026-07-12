// import Link from "next/link";
// import { cookies } from "next/headers";

// import UserDashboard from "@/components/UserDashboard";

export default function Home() {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("access_token");

  return (
    <div>
      <h1>Home page</h1>
      {/* {token ? (
        <>
          <Link href={"/loan-form/business"}>Apply for a new loan</Link>
          <UserDashboard />
        </>
      ) : (
        <Link href={"/login"}>Login to start applying</Link>
      )} */}
    </div>
  );
}
