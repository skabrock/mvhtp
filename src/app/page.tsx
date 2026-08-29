import { OnboardingForm } from "@/components";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 px-4">
      <div className="bg-background w-full max-w-md rounded-2xl p-8 shadow-xl">
        <OnboardingForm />
      </div>
    </main>
  );
}
