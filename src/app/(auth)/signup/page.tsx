import { IconExclamationCircle } from "@tabler/icons-react";
import { SignupForm } from "./signup-form";
export const metadata = {
  title: "SignUp",
};


export default async function Page() {
  return (
    <>
      <div className="mx-auto md:mt-0 mt-10 relative">
        {/* <!-- SignupForm spans 2 columns starting from column 2 --> */}
        <SignupForm className="w-sm" />
      </div>

      <div className="absolute w-full md:w-fit left-1/2 -translate-x-1/2 top-20 md:px-0 px-10 md:top-12 text-muted-foreground flex items-center gap-x-2">
        <IconExclamationCircle className="md:size-5 size-8" />
        <p className="text-sm font-quicksand">
          We're currently in development. Please sign in with GitHub or Google
          to continue.
        </p>
      </div>
    </>
  );
}
