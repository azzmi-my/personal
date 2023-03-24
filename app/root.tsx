import { Stack, Loader as MantineLoader, useMantineTheme } from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";
import {
  completeNavigationProgress,
  startNavigationProgress,
  NavigationProgress,
} from "@mantine/nprogress";
import type {
  ActionArgs,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
  useNavigation,
} from "@remix-run/react";
import { useEffect } from "react";
import appStyles from "~/styles/app.css";
import { Providers } from "./ui/provider";
import { getEnv } from "./utils/app/env.server";
import { getDomainUrl, removeTrailingSlash } from "./utils/other";
import { getToastSession } from "./utils/sessions/toast.server";
import {
  NonFlashOfWrongThemeEls,
  ThemeProvider,
  useTheme,
} from "./utils/theme/provider";
import { getThemeSession } from "./utils/theme/theme.server";
import { GlobalToast } from "./ui/global-toast";
import type { Handle } from "types/types";
import { AppShell } from "./mantine";
import FontStyles from "@fontsource/ubuntu-mono/index.css";
import { useTour } from "./components/touric/tour";

export const handle: Handle & { id: string } = {
  id: "root",
  color: "orange",
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Ali Azzmzmi",
  viewport: "width=device-width,initial-scale=1",
});
export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: FontStyles,
    },
    { rel: "stylesheet", href: appStyles },
    // {
    //   rel: "stylesheet",
    //   href: "https://fonts.googleapis.com/css2?family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap",
    // },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicons/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicons/favicon-16x16.png",
    },
    { rel: "manifest", href: "/site.webmanifest" },
    { rel: "icon", href: "/favicon.ico" },
  ];
};

export async function loader({ request, context }: LoaderArgs) {
  const toast = await getToastSession(request);
  // const toastId = toast.getSessionId()
  const toastMessage = toast.getToastMessage();
  const themeSession = await getThemeSession(request);

  const data = {
    cspNonce: context.cspNonce,
    toastMessage,
    theme: themeSession.getTheme(),
    ENV: getEnv(),
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  };

  const headers: HeadersInit = new Headers();
  await toast.getHeaders(headers);

  return json(data, { headers });
}
export type Loader = typeof loader;
export async function action({ request }: ActionArgs) {
  const form = new URLSearchParams(await request.text());
  const actionId = form.get("actionId");

  if (actionId === "closeToast") {
    const toast = await getToastSession(request);
    toast.unsetSessionId();
    return json(
      {},
      {
        headers: await toast.getHeaders(),
      }
    );
  }
  return {};
}

function HTML({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const nonce = typeof document === "undefined" ? data.cspNonce : "";

  const [theme] = useTheme();

  const mt = useMantineTheme();

  return (
    <Providers theme={data.theme}>
      <html
        lang="en"
        className={theme ?? ""}
        style={{
          height: "100%",
        }}
      >
        <head>
          <StylesPlaceholder />
          <title>Ali Azzmzmi</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <link
            rel="canonical"
            href={removeTrailingSlash(
              `${data.requestInfo.origin}${data.requestInfo.path}`
            )}
          />
          <Links />
          {/* <ThemeHead ssrTheme={Boolean(data.theme)} /> */}
          <NonFlashOfWrongThemeEls
            nonce={nonce}
            ssrTheme={Boolean(data.theme)}
          />
          <style>
            {`
            ::selection {
              background-color: ${
                theme === "dark" ? mt.colors.gray[0] : mt.colors.gray[9]
              };
              color: ${
                theme === "dark" ? mt.colors.gray[9] : mt.colors.gray[0]
              };
            }
            `}
          </style>
        </head>
        <body
          style={{
            height: "100%",
          }}
        >
          {children}
          <ScrollRestoration />
          <Scripts nonce={nonce} />
          <script
            nonce={nonce}
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(data.ENV)};`,
            }}
          />
          <LiveReload nonce={nonce} />
        </body>
      </html>
    </Providers>
  );
}

export default function App() {
  const matches = useMatches();
  // const outlet = useOutlet();

  let color = "gray";
  let noLoader = false;
  let noLayout = false;
  for (const match of matches.reverse()) {
    const matchHandle = match.handle as Handle | undefined;
    if (!matchHandle) continue;
    if ("color" in matchHandle) {
      color = matchHandle.color ?? "gray";
    }
    if ("noLoader" in matchHandle) {
      noLoader = matchHandle.noLoader ?? false;
    }
    if ("noLayout" in matchHandle) {
      noLayout = matchHandle.noLayout ?? false;
    }
  }
  const data = useLoaderData<typeof loader>();

  const tour = useTour();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (tour.find({ tourId: "pdf" })?.id) return;

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
      {
        id: "reset",
        meta: {},
        order: 3,
      },
    ]);
  }, []);

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <HTML>
        <RouteTransitions color={color} noLoader={noLoader} />
        <GlobalToast />
        {noLayout ? (
          <Outlet />
        ) : (
          <AppShell color={color}>
            <Outlet />
          </AppShell>
        )}
      </HTML>
    </ThemeProvider>
  );
}

const RouteTransitions = ({
  color,
  noLoader,
}: {
  color?: string;
  noLoader?: boolean;
}) => {
  const transition = useNavigation();
  useEffect(() => {
    if (noLoader) return;
    if (transition.state === "idle") completeNavigationProgress();
    else startNavigationProgress();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transition.state]);

  if (noLoader) return null;

  return (
    <>
      <NavigationProgress autoReset={true} color={color ?? "lime"} />
      {transition.state !== "idle" && (
        <Stack
          p={2}
          m={0}
          sx={(theme) => ({
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 1000,
            borderRadius: 9999,
            background: theme.fn.gradient({
              from: theme.colors[color ?? "lime"]![3],
              to: theme.colors[color ?? "lime"]![7],
            }),
          })}
        >
          <MantineLoader color="white" variant="dots" size="sm" />
        </Stack>
      )}
    </>
  );
};
