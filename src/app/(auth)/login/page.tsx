import { LoginForm } from "./login-form";

export default async function Page() {
  return (
    <div className="mx-auto mt-30 md:mt-10">
      {/* <!-- SignupForm spans 2 columns starting from column 2 --> */}
      <LoginForm className="w-sm" />
      
    </div>
  );
}
