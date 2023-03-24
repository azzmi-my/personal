import { createStylesServer, injectStyles } from "@mantine/remix";
import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import ReactDOMServer from "react-dom/server";
import { getEnv } from "./utils/app/env.server";

const server = createStylesServer();

global.ENV = getEnv();

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  let markup = ReactDOMServer.renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  const html = `<!DOCTYPE html>${injectStyles(markup, server)}`;

  responseHeaders.set("Content-Type", "text/html");
  responseHeaders.set("Content-Length", String(Buffer.byteLength(html)));

  return new Response(html, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
