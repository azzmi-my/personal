import { createCookieSessionStorage } from "@remix-run/node";

export const sessionIdKey = "__message_session_key";

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;
export type ToastMessage = { message: string; type: "success" | "error" };

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__message",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    expires: new Date(Date.now() + ONE_YEAR),
    secrets: ["SUPER_SECRET"],
    secure: true,
  },
});

export async function getToastSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const initialValue = await sessionStorage.commitSession(session);
  const getSessionId = () => session.get(sessionIdKey) as string | undefined;
  const unsetSessionId = () => session.unset(sessionIdKey);

  const commit = async () => {
    const currentValue = await sessionStorage.commitSession(session);
    return currentValue === initialValue ? null : currentValue;
  };
  return {
    session,
    getSessionId,
    unsetSessionId,
    commit,
    setSuccessMessage: (message: string) => {
      session.flash("toastMessage", {
        message,
        type: "success",
      } as ToastMessage);
    },
    setErrorMessage: (message: string) => {
      session.flash("toastMessage", { message, type: "error" } as ToastMessage);
    },
    getToastMessage: () => {
      return session.get("toastMessage") as ToastMessage | undefined;
    },
    getHeaders: async (headers: ResponseInit["headers"] = new Headers()) => {
      const value = await commit();
      if (!value) return headers;
      if (headers instanceof Headers) {
        headers.append("Set-Cookie", value);
      } else if (Array.isArray(headers)) {
        headers.push(["Set-Cookie", value]);
      } else {
        headers["Set-Cookie"] = value;
      }
      return headers;
    },
  };
}
