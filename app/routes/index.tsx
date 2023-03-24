import {
  Box,
  Container,
  Group,
  Stack,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { createElement } from "react";

export default function Index() {
  return (
    <Container size="sm">
      <Stack align="center">
        <Group>
          <Icon icon={"7"} />
          <Text>years in Product Development and Management</Text>
        </Group>
        <Group>
          <Icon icon={"5"} />
          <Text>years in Front End Development</Text>
        </Group>
        <Group>
          <Icon icon={"3"} />
          <Text>years in Full Stack Development</Text>
        </Group>
        <Group>
          <Icon icon={"2"} />
          <Text>years in DevOps</Text>
        </Group>
      </Stack>
    </Container>
  );
}

const Icon = ({ icon }: { icon: React.ComponentType | string }) => {
  const iconStyles: React.CSSProperties = {
    position: "absolute",
    top: 5,
    right: 0,
  };
  const theme = useMantineTheme();
  return (
    <Box pos="relative">
      {typeof icon === "string" ? (
        <Text
          variant="gradient"
          gradient={{
            from: theme.colors.orange[3],
            to: theme.colors.orange[7],
          }}
          weight="bolder"
          size="xl"
        >
          {icon}
          <Text span size="sm" ml={2}>
            +
          </Text>
        </Text>
      ) : (
        <ThemeIcon
          variant="gradient"
          gradient={{
            from: theme.colors.orange[3],
            to: theme.colors.orange[7],
          }}
          sx={{
            paddingRight: 5,
          }}
          size="md"
        >
          {createElement(icon, {
            // @ts-ignore
            size: 32,
          })}
          <IconPlus size={12} style={iconStyles} />
        </ThemeIcon>
      )}
    </Box>
  );
};
