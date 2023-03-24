import type { MantineColor } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";

export const useColor = () => {
  const theme = useMantineTheme();
  return (color: MantineColor) => {
    return theme.colors[color]![theme.colorScheme === "dark" ? 5 : 7];
  };
};
