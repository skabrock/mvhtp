import { StepIndicator, OnboardingForm } from "@/components";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-100">
      <div className="grid gap-y-5 place-items-center px-4 py-5">
        <StepIndicator current={1} />
        <div className="bg-background w-full max-w-md rounded-2xl p-8 shadow-xl">
          <OnboardingForm />
        </div>
      </div>
    </main>
  );
}
