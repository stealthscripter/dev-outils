import { LoginForm } from "./login-form";

export default async function Page() {
  return (
    <div className="border border-amber-700 min-h-screen flex items-center justify-center">
      {/* <!-- SignupForm spans 2 columns starting from column 2 --> */}
      <LoginForm className="w-sm" />
    </div>
  );
}
