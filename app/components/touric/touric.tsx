import { cloneElement, Suspense, useEffect, useRef, useState } from "react";
import type { TestPopOverProps } from "./float";
import type { Step } from "./tour";
import { useStep } from "./tour";
import { Transition } from "./transition";

interface TouricProps extends Omit<TestPopOverProps, "component"> {
  component:
    | React.ReactNode
    | ((props: {
        step: Step;
        state: ReturnType<typeof useStep>;
      }) => React.ReactNode);
  tourId: string;
  stepId: string;
  enabled?: boolean;
}
export const Touric = ({
  children,
  tourId,
  stepId,
  enabled = false,
  ...props
}: TouricProps) => {
  const [Component, setComponent] = useState(<></>);
  const ComponentRef = useRef(<></>);

  const state = useStep({ tourId, stepId });

  const step = state?.find();
  const completed = step?.completed;

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!step)
      throw new Error(`Step '${stepId}' not found in Tour '${tourId}'`);

    if (!completed && enabled) {
      (async () => {
        const C = await import("./float").then(({ TestPopOver }) => (
          <TestPopOver
            tourId={tourId}
            {...props}
            style={{
              ...props.style,
            }}
            component={
              typeof props.component === "function"
                ? props.component({ step, state })
                : props.component
            }
          >
            {children}
          </TestPopOver>
        ));
        ComponentRef.current = C;
        setComponent(ComponentRef.current);
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed, enabled]);

  if (!enabled) return <>{children}</>;

  return !completed ? cloneElement(Component) : <>{children}</>;
};

export const TouricClientOnly = (props: TouricProps) => {
  return (
    <ClientOnly fallback={<div />}>
      {() => (
        <Suspense>
          <Transition transition="fade" mounted={true} keepMounted={true}>
            {(styles) => (
              <Touric {...props} style={{ ...props.style, ...styles }} />
            )}
          </Transition>
          {/* <Touric {...props} /> */}
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
