import {
  ColorSchemeProvider,
  createEmotionCache,
  MantineProvider,
} from "@mantine/core";
import type { ColorScheme, MantineThemeOverride } from "@mantine/core";
import { useState } from "react";
import { Theme, useTheme } from "~/utils/theme/provider";
import { useHotkeys } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

const theme: MantineThemeOverride = {
  colorScheme: "dark",
  primaryColor: "orange",
  fontFamily: "Ubuntu Mono, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  components: {
    Text: {
      defaultProps: {
        color: "dimmed",
      },
    },
  },
};

type Props = {
  tm: string;
  children: React.ReactNode;
};
createEmotionCache({ key: "mantine" });

const Provider = ({ tm, children }: Props) => {
  const [, setTheme] = useTheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    tm as ColorScheme
  );
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
    setTheme((previousTheme) =>
      previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    );
  };

  useHotkeys([["mod+J", () => toggleColorScheme()]]);
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          ...theme,
          colorScheme,
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications />
        <ModalsProvider>{children}</ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
export const Providers = ({
  theme,
  children,
}: {
  theme: string;
  children: React.ReactNode;
}) => {
  return <Provider tm={theme}>{children}</Provider>;
};
