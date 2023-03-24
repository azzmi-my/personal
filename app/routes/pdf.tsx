import type { Handle } from "~/types";
import { handle as parentHandle } from "~/root";
import { Box } from "@mantine/core";
import PrintContainer from "~/components/print";
import { useEffect, useState } from "react";

export const handle: Handle & { id: string } = {
  id: "pdf",
  noLayout: true,
  color: parentHandle.color,
};

export default function PDF() {
  return (
    <Box>
      <ClientOnly>{() => <PrintContainer color={handle.color} />}</ClientOnly>
    </Box>
  );
}

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
