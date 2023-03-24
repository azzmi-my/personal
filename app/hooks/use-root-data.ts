import type { SerializeFrom } from "@remix-run/node";
import type { Loader } from "~/root";
import { handle } from "~/root";
import { useMatchLoaderData } from "~/utils/other";

export const useRootData = () =>
  useMatchLoaderData<SerializeFrom<Loader>>(handle.id);
