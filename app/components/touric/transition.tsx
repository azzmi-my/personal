import * as React from "react";

function useDidUpdate(
  fn: React.EffectCallback,
  dependencies?: React.DependencyList
) {
  const mounted = React.useRef(false);

  React.useEffect(
    () => () => {
      mounted.current = false;
    },
    []
  );

  React.useEffect(() => {
    if (mounted.current) {
      return fn();
    }

    mounted.current = true;
    return undefined;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

const transitionStatuses = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out",
} as const;

export function getTransitionStyles({
  transition,
  state,
  duration,
  timingFunction,
}: {
  transition: TransitionType;
  state: keyof typeof transitionStatuses;
  duration: number;
  timingFunction: React.CSSProperties["transitionTimingFunction"];
}): React.CSSProperties {
  const shared = {
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: timingFunction,
  };

  if (typeof transition === "string") {
    if (!(transition in transitions)) {
      return {};
    }

    return {
      transitionProperty: transitions[transition].transitionProperty,
      ...shared,
      ...transitions[transition].common,
      ...transitions[transition][transitionStatuses[state]],
    };
  }

  return {
    transitionProperty: transition.transitionProperty,
    ...shared,
    ...transition.common,
    ...transition[transitionStatuses[state]],
  };
}

export type TransitionStatus =
  | "entered"
  | "exited"
  | "entering"
  | "exiting"
  | "pre-exiting"
  | "pre-entering";

interface UseTransition {
  duration: number;
  exitDuration: number;
  timingFunction: string;
  mounted: boolean;
  reduceMotion: boolean;
  onEnter?(): void;
  onExit?(): void;
  onEntered?(): void;
  onExited?(): void;
}

export function useTransition({
  duration,
  exitDuration,
  timingFunction,
  mounted,
  reduceMotion = false,
  onEnter,
  onExit,
  onEntered,
  onExited,
}: UseTransition) {
  const [transitionDuration, setTransitionDuration] = React.useState(
    reduceMotion ? 0 : duration
  );
  const [transitionStatus, setStatus] = React.useState<TransitionStatus>(
    mounted ? "entered" : "exited"
  );
  const timeoutRef = React.useRef<number>(-1);

  const handleStateChange = (shouldMount: boolean) => {
    const preHandler = shouldMount ? onEnter : onExit;
    const handler = shouldMount ? onEntered : onExited;

    setStatus(shouldMount ? "pre-entering" : "pre-exiting");
    window.clearTimeout(timeoutRef.current);

    const newTransitionDuration = reduceMotion
      ? 0
      : shouldMount
      ? duration
      : exitDuration;
    setTransitionDuration(newTransitionDuration);

    if (newTransitionDuration === 0) {
      typeof preHandler === "function" && preHandler();
      typeof handler === "function" && handler();
      setStatus(shouldMount ? "entered" : "exited");
    } else {
      const preStateTimeout = window.setTimeout(() => {
        typeof preHandler === "function" && preHandler();
        setStatus(shouldMount ? "entering" : "exiting");
      }, 10);

      timeoutRef.current = window.setTimeout(() => {
        window.clearTimeout(preStateTimeout);
        typeof handler === "function" && handler();
        setStatus(shouldMount ? "entered" : "exited");
      }, newTransitionDuration);
    }
  };

  useDidUpdate(() => {
    handleStateChange(mounted);
  }, [mounted]);

  React.useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  return {
    transitionDuration,
    transitionStatus,
    transitionTimingFunction: timingFunction || "ease",
  };
}

function createConverter(units: string) {
  return (px: unknown) => {
    if (typeof px === "number") {
      return `${px / 16}${units}`;
    }

    if (typeof px === "string") {
      const replaced = px.replace("px", "");
      if (!Number.isNaN(Number(replaced))) {
        return `${Number(replaced) / 16}${units}`;
      }
    }

    return px as string;
  };
}

export const rem = createConverter("rem");
export const em = createConverter("em");

export interface TransitionStyles {
  common?: React.CSSProperties;
  in: React.CSSProperties;
  out: React.CSSProperties;
  transitionProperty: React.CSSProperties["transitionProperty"];
}

export type TransitionName =
  | "fade"
  | "skew-up"
  | "skew-down"
  | "rotate-right"
  | "rotate-left"
  | "slide-down"
  | "slide-up"
  | "slide-right"
  | "slide-left"
  | "scale-y"
  | "scale-x"
  | "scale"
  | "pop"
  | "pop-top-left"
  | "pop-top-right"
  | "pop-bottom-left"
  | "pop-bottom-right";

export type TransitionType = TransitionName | TransitionStyles;

const popIn = {
  in: { opacity: 1, transform: "scale(1)" },
  out: { opacity: 0, transform: `scale(.9) translateY(${rem(10)})` },
  transitionProperty: "transform, opacity",
};

export const transitions: Record<TransitionName, TransitionStyles> = {
  fade: {
    in: { opacity: 1 },
    out: { opacity: 0 },
    transitionProperty: "opacity",
  },

  scale: {
    in: { opacity: 1, transform: "scale(1)" },
    out: { opacity: 0, transform: "scale(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity",
  },

  "scale-y": {
    in: { opacity: 1, transform: "scaleY(1)" },
    out: { opacity: 0, transform: "scaleY(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity",
  },

  "scale-x": {
    in: { opacity: 1, transform: "scaleX(1)" },
    out: { opacity: 0, transform: "scaleX(0)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity",
  },

  "skew-up": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: {
      opacity: 0,
      transform: `translateY(-${rem(20)}) skew(-10deg, -5deg)`,
    },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity",
  },

  "skew-down": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: {
      opacity: 0,
      transform: `translateY(${rem(20)}) skew(-10deg, -5deg)`,
    },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity",
  },

  "rotate-left": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: `translateY(${rem(20)}) rotate(-5deg)` },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity",
  },

  "rotate-right": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: `translateY(${rem(20)}) rotate(5deg)` },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity",
  },

  "slide-down": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(-100%)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity",
  },

  "slide-up": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(100%)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity",
  },

  "slide-left": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(100%)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity",
  },

  "slide-right": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(-100%)" },
    common: { transformOrigin: "right" },
    transitionProperty: "transform, opacity",
  },

  pop: {
    ...popIn,
    common: { transformOrigin: "center center" },
  },

  "pop-bottom-left": {
    ...popIn,
    common: { transformOrigin: "bottom left" },
  },

  "pop-bottom-right": {
    ...popIn,
    common: { transformOrigin: "bottom right" },
  },

  "pop-top-left": {
    ...popIn,
    common: { transformOrigin: "top left" },
  },

  "pop-top-right": {
    ...popIn,
    common: { transformOrigin: "top right" },
  },
};

export interface TransitionProps {
  /** If set element will not be unmounted from the DOM when it is hidden, display: none styles will be added instead */
  keepMounted?: boolean;

  /** Predefined transition name or transition styles */
  transition: TransitionType;

  /** Transition duration in ms */
  duration?: number;

  /** Exit transition duration in ms */
  exitDuration?: number;

  /** Transition timing function, defaults to theme.transitionTimingFunction */
  timingFunction?: string;

  /** When true, component will be mounted */
  mounted: boolean;

  reduceMotion?: boolean;

  /** Render function with transition styles argument */
  children(styles: React.CSSProperties): React.ReactElement<any, any>;

  /** Calls when exit transition ends */
  onExited?: () => void;

  /** Calls when exit transition starts */
  onExit?: () => void;

  /** Calls when enter transition starts */
  onEnter?: () => void;

  /** Calls when enter transition ends */
  onEntered?: () => void;
}

export type TransitionOverride = Partial<Omit<TransitionProps, "mounted">>;

export function Transition({
  keepMounted,
  transition,
  duration = 250,
  exitDuration = duration,
  mounted,
  reduceMotion = false,
  children,
  timingFunction = "ease",
  onExit,
  onEntered,
  onEnter,
  onExited,
}: TransitionProps) {
  const { transitionDuration, transitionStatus, transitionTimingFunction } =
    useTransition({
      mounted,
      exitDuration,
      duration,
      timingFunction,
      reduceMotion,
      onExit,
      onEntered,
      onEnter,
      onExited,
    });

  if (transitionDuration === 0) {
    return mounted ? (
      <>{children({})}</>
    ) : keepMounted ? (
      children({ display: "none" })
    ) : null;
  }

  return transitionStatus === "exited" ? (
    keepMounted ? (
      children({ display: "none" })
    ) : null
  ) : (
    <>
      {children(
        getTransitionStyles({
          transition,
          duration: transitionDuration,
          state: transitionStatus,
          timingFunction: transitionTimingFunction,
        })
      )}
    </>
  );
}

Transition.displayName = "Transition";
