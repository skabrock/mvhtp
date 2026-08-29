export function StepIndicator({ current }: { current: number }) {
  return (
    <h3 className="font-light">
      Step <strong className="font-bold">{current}</strong> of 5
    </h3>
  );
}
