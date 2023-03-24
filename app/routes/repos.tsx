import {
  Anchor,
  Container,
  Group,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

export default function Repos() {
  return (
    <Container size="sm">
      <Group spacing="xl" position="center" pb="xl">
        <Stack
          maw={300}
          miw={300}
          mah={150}
          mih={150}
          pos="relative"
          p="xs"
          sx={(theme) => ({
            borderRadius: theme.radius.sm,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor:
              theme.colorScheme === "dark"
                ? theme.colors.gray[6]
                : theme.colors.gray[3],
          })}
        >
          <Text weight="bolder">⚡ Vonage Wrapper</Text>
          <Text opacity={0.5} lineClamp={2}>
            A wrapper around Vonage Server SDK
          </Text>
          <Anchor
            size="xs"
            pos="absolute"
            sx={{
              left: 8,
              bottom: 8,
            }}
            href="https://github.com/norassystemes/vonage-wrapper"
            target="_blank"
          >
            <Group>
              <ThemeIcon
                size="xs"
                color="gray"
                variant="light"
                bg="transparent"
              >
                <IconBrandGithub />
              </ThemeIcon>
              <Text>View on GitHub</Text>
            </Group>
          </Anchor>
        </Stack>
        <Stack
          maw={300}
          miw={300}
          mah={150}
          mih={150}
          pos="relative"
          p="xs"
          sx={(theme) => ({
            borderRadius: theme.radius.sm,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor:
              theme.colorScheme === "dark"
                ? theme.colors.gray[6]
                : theme.colors.gray[3],
          })}
        >
          <Text weight="bolder">⬛ Termical</Text>
          <Text opacity={0.5} lineClamp={2}>
            A simple reactjs component to display a terminal
          </Text>
          <Anchor
            pos="absolute"
            sx={{
              left: 8,
              bottom: 8,
            }}
            size="xs"
            href="https://github.com/norassystemes/terminal-react"
            target="_blank"
          >
            <Group>
              <ThemeIcon
                size="xs"
                color="gray"
                variant="light"
                bg="transparent"
              >
                <IconBrandGithub />
              </ThemeIcon>
              <Text>View on GitHub</Text>
            </Group>
          </Anchor>
        </Stack>
        <Stack
          maw={300}
          miw={300}
          mah={150}
          mih={150}
          pos="relative"
          p="xs"
          sx={(theme) => ({
            borderRadius: theme.radius.sm,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor:
              theme.colorScheme === "dark"
                ? theme.colors.gray[6]
                : theme.colors.gray[3],
          })}
        >
          <Text weight="bolder">🖨️ Printical</Text>
          <Text opacity={0.5} lineClamp={2}>
            A simple component to print or generate a pdf from a react
            component.
          </Text>
          <Anchor
            pos="absolute"
            sx={{
              left: 8,
              bottom: 8,
            }}
            size="xs"
            href="https://github.com/norassystemes/printical"
            target="_blank"
          >
            <Group>
              <ThemeIcon
                size="xs"
                color="gray"
                variant="light"
                bg="transparent"
              >
                <IconBrandGithub />
              </ThemeIcon>
              <Text>View on GitHub</Text>
            </Group>
          </Anchor>
        </Stack>
        <Stack
          maw={300}
          miw={300}
          mah={150}
          mih={150}
          pos="relative"
          p="xs"
          sx={(theme) => ({
            borderRadius: theme.radius.sm,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor:
              theme.colorScheme === "dark"
                ? theme.colors.gray[6]
                : theme.colors.gray[3],
          })}
        >
          <Text weight="bolder">✨ PDF Gen</Text>
          <Text opacity={0.5} lineClamp={2}>
            A simple AWS service to generate pdf and host it in s3 bucket
          </Text>
          <Anchor
            pos="absolute"
            sx={{
              left: 8,
              bottom: 8,
            }}
            size="xs"
            href="https://github.com/SomiDivian/puppeteer-aws-pulumi"
            target="_blank"
          >
            <Group>
              <ThemeIcon
                size="xs"
                color="gray"
                variant="light"
                bg="transparent"
              >
                <IconBrandGithub />
              </ThemeIcon>
              <Text>View on GitHub</Text>
            </Group>
          </Anchor>
        </Stack>
      </Group>
    </Container>
  );
}
