import { RemixBrowser } from "@remix-run/react";

import { hydrateRoot } from "react-dom/client";
import { StrictMode } from "react";
import { handleDarkAndLightModeEls } from "./utils/theme/provider";
import { ClientProvider } from "@mantine/remix";

function hydrate() {
  handleDarkAndLightModeEls();
  hydrateRoot(
    document,
    <StrictMode>
      {/* <ClientProvider> */}
      <RemixBrowser />
      {/* </ClientProvider> */}
    </StrictMode>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
