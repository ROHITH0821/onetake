import { StepProgress } from "@/components/step-progress";
import { FlowProvider } from "@/lib/flow-store";

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <FlowProvider>
      <StepProgress />
      {children}
    </FlowProvider>
  );
}
