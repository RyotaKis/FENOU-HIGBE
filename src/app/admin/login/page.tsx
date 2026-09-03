import { getSiteLogo } from "@/lib/pageContent";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  const logo = await getSiteLogo();

  return <LoginForm logoSrc={logo.header} />;
}
