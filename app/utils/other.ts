import { useMatches } from "@remix-run/react";
import { useMemo } from "react";
import type { Handle } from "~/types";

export function removeTrailingSlash(s: string) {
  return s.endsWith("/") ? s.slice(0, -1) : s;
}

export function getDomainUrl(request: Request) {
  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host");
  if (!host) {
    throw new Error("Could not determine domain URL.");
  }
  const protocol = host.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.handle?.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

export function useMatchLoaderData<LoaderData>(handleId: string) {
  const matches = useMatches();
  const match = matches.find(
    ({ handle }) => (handle as Handle | undefined)?.id === handleId
  );
  // if (!match) {
  //   throw new Error(`No active route has a handle ID of ${handleId}`);
  // }
  return match?.data as LoaderData;
}
