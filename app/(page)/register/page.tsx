import Signup from "./components/Signup";
import SignupBanner from "./components/SignupBanner";

export default function Page() {
  
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white">
        <Signup />
      </div>

      <div className="hidden lg:block relative w-0 flex-1">
        <SignupBanner />
      </div>
    </div>
  );
}