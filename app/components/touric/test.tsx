import { Box, PopoverBaseProps } from "@mantine/core";
import {
  cloneElement,
  forwardRef,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { useStep, useTour, Step as StepType } from "./tour";

const Add = () => {
  const tour = useTour({ tourId: "pdf" });
  console.log(tour.step().findMany({ stepsIds: "all" }));
  console.log(tour.completed());
  return (
    <div>
      <button
        onClick={() =>
          tour.create("pdf", [
            {
              id: "print",
              meta: {},
              order: 0,
            },
            {
              id: "download",
              meta: {},
              order: 1,
            },
            {
              id: "back",
              meta: {},
              order: 2,
            },
          ])
        }
      >
        Add Tour w/ steps
      </button>
    </div>
  );
};

const TestStep = () => {
  const tour = useTour({ tourId: "first" });
  const step = tour.step();
  const steps = step.findMany({ stepsIds: "all" });
  console.log(steps);
  return (
    <div>
      <ClientOnlyStep
        tourId="first"
        stepId="first-step"
        onComplete={() => undefined}
      />
    </div>
  );
};

const TestTour = () => {
  const tour = useTour({ tourId: "first" });
  const completed = tour.completed();

  if (completed) return null;
  return <div>{/* <button></button> */}</div>;
};

export const Test = forwardRef<HTMLDivElement, any>((props, ref) => {
  return (
    <div ref={ref} {...props}>
      <ClientOnly>{() => <Add />}</ClientOnly>
      {/* <TestTour />
      <TestStep />
      <TestStep /> */}
    </div>
  );
});

interface StepProps extends PopoverBaseProps {
  stepId: string;
  tourId: string;
  targetRef?: React.RefObject<HTMLElement>;
  /**
   * If true, the step will be completed when closed
   * i.e when the user clicks outside of the step, or presses
   * the escape key.
   */
  completeOnClose?: boolean;
  /** Popover.Target and Popover.Dropdown components */
  children?: React.ReactNode;

  /** Initial opened state for uncontrolled component */
  defaultOpened?: boolean;

  /** Controls dropdown opened state */
  opened?: boolean;

  /** Called with current state when dropdown opens or closes */
  onChange?(opened: boolean): void;

  /** Determines whether dropdown should be closed on outside clicks, default to true */
  closeOnClickOutside?: boolean;

  /** Events that trigger outside clicks */
  clickOutsideEvents?: string[];

  /** Determines whether focus should be trapped within dropdown, default to false */
  trapFocus?: boolean;

  /** Determines whether dropdown should be closed when Escape key is pressed, defaults to true */
  closeOnEscape?: boolean;

  /** id base to create accessibility connections */
  id?: string;

  /** Determines whether dropdown and target element should have accessible roles, defaults to true */
  withRoles?: boolean;

  onComplete?: (
    state: ReturnType<typeof useStep>,
    step: StepType,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
}
const Step = ({ stepId, tourId, onComplete }: StepProps) => {
  // const _step = useTour({ tourId: "first" }).step({ stepId: name });
  // const step = _step.find()!;
  const state = useStep({ tourId, stepId });
  const step = state.find()!;

  const complete = () => {
    return state.complete({
      stepId,
      tourId,
    });
  };
  return (
    <div
      style={{
        color: step.completed ? "green" : "red",
      }}
    >
      {step.id}{" "}
      <button
        onClick={(e) => {
          complete();
          if (onComplete) onComplete(state, step, e);
        }}
      >
        ✅
      </button>{" "}
      <button
        onClick={() =>
          state.update(
            {
              completed: undefined,
              meta: {},
              order: step.order,
              tourId,
            },
            {
              stepId,
            }
          )
        }
      >
        🌟
      </button>
    </div>
  );
};
const ClientOnlyStep = ({ stepId, tourId, onComplete }: StepProps) => {
  return (
    <ClientOnly fallback={<div />}>
      {() => (
        <Suspense>
          <Step stepId={stepId} tourId={tourId} onComplete={onComplete}>
            {"h"}
          </Step>
        </Suspense>
      )}
    </ClientOnly>
  );
};

let hydrating = true;
function useHydrated() {
  let [hydrated, setHydrated] = useState(() => !hydrating);

  useEffect(function hydrate() {
    hydrating = false;
    setHydrated(true);
  }, []);

  return hydrated;
}
type Props = {
  /**
   * You are encouraged to add a fallback that is the same dimensions
   * as the client rendered children. This will avoid content layout
   * shift which is disgusting
   */
  children(): React.ReactNode;
  fallback?: React.ReactNode;
};
function ClientOnly({ children, fallback = null }: Props) {
  return useHydrated() ? <>{children()}</> : <>{fallback}</>;
}

type CompleteArgs = {
  tourId: string;
  stepId: string;
  state: ReturnType<typeof useStep>;
};
const complete = (args: CompleteArgs) => {
  const { state, stepId, tourId } = args;

  return state.complete({
    stepId,
    tourId,
  });
};
