// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import React from "react";

// export default async function ProtectedLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const session = await auth();

//   if (!session || !session.user) {
//     return redirect("/signin");
//   }

//   return (
//     <div className="mt-[6rem] flex h-[calc(100vh-36px-4rem)] max-h-full">
//       {children}
//     </div>
//   );
// }


// import { auth } from "@/lib/auth";
// import { redirect } from "next/navigation";
import React from "react";
import Footer from "@/components/Footer";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();

  // if (!session || !session.user) {
  //   return redirect("/signin");
  // }

  return (
    <div className="mt-[6rem] h-[calc(100vh-36px-4rem)] max-h-full">
      {children}
      <Footer />
    </div>
  );
}