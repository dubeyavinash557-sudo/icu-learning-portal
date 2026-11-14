
import { redirect } from "next/navigation";
import { getSignedInAdmin } from "@/lib/admin-auth";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default async function AdminLayout({
  children,
}: AdminLayoutProps) {
  const admin = await getSignedInAdmin();

  if (!admin) {
    redirect("/login?callbackUrl=/admin");
  }

  return <>{children}</>;
}
