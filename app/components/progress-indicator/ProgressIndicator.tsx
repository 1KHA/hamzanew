
import { memo } from "react";
import "./ProgressIndicator.css";

type LabelStyle = "circle" | "dot";
type Alignment = "horizontal" | "vertical";
type StepState = "completed" | "current" | "upcoming";

export interface ProgressStep {
  title?: string;
  description?: string;
  showStepName?: boolean;
  showStepDescription?: boolean;
  labelStyle?: LabelStyle;
}

export interface ProgressIndicatorProps {
  steps: ProgressStep[];
  /** 1-based index of the current step. Default: 1 */
  activeStep?: number;
  alignment?: Alignment;
}

const STATE_LABELS: Record<StepState, string> = {
  completed: "مكتملة",
  current: "الحالية",
  upcoming: "قادمة",
};

function getStepState(activeStep: number, stepNumber: number): StepState {
  if (activeStep > stepNumber) return "completed";
  if (activeStep < stepNumber) return "upcoming";
  return "current";
}

interface StepItemProps {
  step: ProgressStep;
  stepNumber: number;
  totalSteps: number;
  state: StepState;
  isLast: boolean;
}

const Checkmark = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M2.5 8L6.5 12L13.5 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StepItem = memo(function StepItem({
  step,
  stepNumber,
  totalSteps,
  state,
  isLast,
}: StepItemProps) {
  const isCompleted = state === "completed";
  const labelStyle = step.labelStyle ?? "circle";

  return (

    <div className="flex flex-row gap-[8px]">

   
    <div className="progress-indicator__step">
      {/* Descriptive text for screen readers; visual content is aria-hidden */}
      <span className="sr-only">
        {`خطوة ${stepNumber} من ${totalSteps}، ${STATE_LABELS[state]}${step.title ? `، ${step.title}` : ""}`}
      </span>

      <div className="progress-indicator__step-content dga-flex-column" aria-hidden="true">
        <div className="step-label" data-state={state}>
          <span className={`step-label--${labelStyle}`}>
            {labelStyle === "circle" && (isCompleted ? Checkmark : stepNumber)}
          </span>
        </div>
        </div>
 </div>
         <div className="step-text flex  flex-col">
          {step.showStepName !== false && step.title && (
            <span className={(isCompleted || state === "current") ? "text-md-medium" : "text-md-regular"}>
              {step.title}
            </span>
          )}
          {step.showStepDescription !== false && step.description && (
            <p className="text-sm-regular">{step.description}</p>
          )}
      </div>

      {!isLast && (
        <span
          className={`progress-indicator__step-connector${
            isCompleted ? " progress-indicator__step-connector--active" : ""
          }`}
          aria-hidden="true"
        />
      )}
    </div>
  );
});

export default function ProgressIndicator({
  steps,
  activeStep = 1,
  alignment = "horizontal",
}: ProgressIndicatorProps) {
  return (
    <nav aria-label={`مؤشر التقدم، خطوة ${activeStep} من ${steps.length}`}>
      <ol className="progress-indicator dga-flex" data-alignment={alignment}>
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const state = getStepState(activeStep, stepNumber);
          return (
            <li
              key={step.title ?? index}
              className="progress-indicator__item"
              aria-current={state === "current" ? "step" : undefined}
            >
              <StepItem
                step={step}
                stepNumber={stepNumber}
                totalSteps={steps.length}
                state={state}
                isLast={index === steps.length - 1}
              />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
