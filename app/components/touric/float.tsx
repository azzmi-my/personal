import React, {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FloatingOverlay,
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useFocus,
  useInteractions,
  FloatingFocusManager,
  useMergeRefs,
  arrow,
  FloatingArrow,
} from "@floating-ui/react";
import type { Placement } from "@floating-ui/react";
import { useTour } from "./tour";
import { RemoveScroll } from "react-remove-scroll";
import { Portal, useMantineTheme } from "@mantine/core";

interface PopoverOptions {
  initialOpen?: boolean;
  placement?: Placement;
  modal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
}
const usePopover = ({
  initialOpen = false,
  placement = "bottom",
  modal = true,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  closeOnEscape = false,
  closeOnClickOutside = false,
}: PopoverOptions = {}) => {
  const arrowRef = useRef(null);

  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen);
  const [labelId, setLabelId] = useState<string | undefined>();
  const [descriptionId, setDescriptionId] = useState<string | undefined>();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({
        alignmentAxis: -75,
        mainAxis: 5 + 7,
      }),
      flip({
        fallbackAxisSideDirection: "end",
      }),
      shift({ padding: 5 }),
      arrow({
        element: arrowRef!,
      }),
    ],
  });

  const context = data.context;

  // const click = useClick(context, {
  //   enabled: controlledOpen == null,
  // });
  const focus = useFocus(context);
  const dismiss = useDismiss(context, {
    escapeKey: closeOnEscape,
    outsidePress: closeOnClickOutside,
  });
  const role = useRole(context);

  const interactions = useInteractions([focus, dismiss, role]);

  const theme = useMantineTheme();

  return useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
      arrowComponent: (
        <FloatingArrow
          fill={
            theme.colorScheme === "dark"
              ? theme.colors.orange[7]
              : theme.colors.orange[7]
          }
          stroke={
            theme.colorScheme !== "dark" ? theme.white : theme.colors.dark[8]
          }
          strokeWidth={1.5}
          strokeLinecap="square"
          ref={arrowRef}
          context={context}
        />
      ),
    }),
    [open, setOpen, interactions, data, modal, labelId, descriptionId, context]
  );
};

type ContextType =
  | (ReturnType<typeof usePopover> & {
      setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
      setDescriptionId: React.Dispatch<
        React.SetStateAction<string | undefined>
      >;
    })
  | null;
const PopoverContext = createContext<ContextType>(null);
const usePopoverContext = () => {
  const context = useContext(PopoverContext);

  if (context == null) {
    throw new Error("Popover components must be wrapped in <Popover />");
  }

  return context;
};

interface PopoverProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  children: React.ReactNode;
  containerProps?: React.HTMLProps<HTMLDivElement>;
  component?: React.ReactNode;
  lockScroll?: boolean;
  withOverlay?: boolean;
}
const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      children,
      containerProps,
      component,
      lockScroll = true,
      withOverlay = true,
      ...props
    },
    propRef
  ) => {
    const { context: floatingContext, ...context } = usePopoverContext();

    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    return (
      <>
        {isValidElement(children) &&
          cloneElement(
            children,
            context.getReferenceProps({
              ref,
              ...props,
              ...children.props,
              "data-state": context.open ? "open" : "closed",
            })
          )}
        {/* <Portal> */}
        {context.open && (
          <RemoveScroll enabled={lockScroll}>
            {withOverlay && <Overlay />}
            <FloatingFocusManager
              context={floatingContext}
              modal={context.modal}
              returnFocus={false}
            >
              <div
                ref={context.refs.setFloating}
                style={{
                  position: context.strategy,
                  // position: "absolute",
                  top: context.y ?? 0,
                  left: context.x ?? 0,
                  width: "max-content",
                  zIndex: 1000,
                  ...containerProps?.style,
                }}
                aria-labelledby={context.labelId}
                aria-describedby={context.descriptionId}
                {...context.getFloatingProps(containerProps)}
              >
                <>
                  {component}
                  {/* <FloatingArrow ref={arrowRef} context={popover.context} /> */}
                  {context.arrowComponent}
                </>
              </div>
            </FloatingFocusManager>
          </RemoveScroll>
        )}
        {/* </Portal> */}
      </>
    );
  }
);
Popover.displayName = "Popover";

interface OverlayProps extends React.ComponentPropsWithoutRef<"div"> {}
export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(
  (props, ref) => {
    return (
      <FloatingOverlay
        ref={ref}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          ...props.style,
        }}
      />
    );
  }
);

Overlay.displayName = "Overlay";

export interface TestPopOverProps extends PopoverProps {
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  /**
   * To auto open
   */
  tourId: string;
}
export const TestPopOver = ({
  children,
  closeOnClickOutside,
  closeOnEscape,
  tourId,
  ...props
}: TestPopOverProps) => {
  const tour = useTour({ tourId });
  const popover = usePopover({
    modal: true,
    placement: "right-start",
    closeOnClickOutside,
    closeOnEscape,
  });

  useEffect(() => {
    setTimeout(() => {
      if (!tour.completed()) popover.setOpen(true);
    }, 10);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const ref = useClickOutside(
  //   () => closeOnClickOutside && popover.setOpen(false)
  // );
  return (
    <PopoverContext.Provider value={popover}>
      <Popover
        {...props}
        // arrowComponent={
        //   <FloatingArrow ref={arrowRef} context={popover.context} />
        // }
      >
        {/* <Popover ref={ref} {...props}> */}
        {children}
      </Popover>
    </PopoverContext.Provider>
  );
};
