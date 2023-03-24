import { createCookieSessionStorage } from "@remix-run/node";
import { Theme, isTheme } from "./provider";

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "Por_theme",
    secure: true,
    secrets: ["SUPER_SECRET_XD89777"],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      const themeValue = session.get("theme");
      return isTheme(themeValue) ? themeValue : Theme.DARK;
    },
    setTheme: (theme: Theme) => session.set("theme", theme),
    commit: () =>
      themeStorage.commitSession(session, { expires: new Date("2040-01-01") }),
  };
}
