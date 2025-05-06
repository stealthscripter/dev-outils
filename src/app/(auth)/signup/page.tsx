import { SignupForm } from "./signup-form";

export default async function Page() {
  return (
    <div className="mx-auto md:mt-0 mt-10">
      {/* <!-- SignupForm spans 2 columns starting from column 2 --> */}
      <SignupForm className="w-sm" />
    </div>
  );
}
