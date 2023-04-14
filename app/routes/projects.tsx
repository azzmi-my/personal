import {
  Anchor,
  Box,
  Container,
  Group,
  Image,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";

export default function Projects() {
  return (
    <Container size="sm">
      <Group spacing="xl" pb="xl" position="center">
        <Stack
          maw={300}
          miw={300}
          mah={550}
          mih={550}
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
          <Box
            sx={{
              overflow: "hidden",
            }}
          >
            <Image h={390} src="/noras-phone.png" />
          </Box>
          <Text weight="bolder">🦅 Nora's Agent Sales</Text>
          <Text opacity={0.5} lineClamp={2}>
            An agents` sales platform for Nora's Products
          </Text>
          <Anchor
            size="xs"
            pos="absolute"
            sx={{
              left: 8,
              bottom: 8,
            }}
            href="https://www.noras.ltd/"
            target="_blank"
          >
            <Group>
              <ThemeIcon
                size="xs"
                color="gray"
                variant="light"
                bg="transparent"
              >
                <IconExternalLink />
              </ThemeIcon>
              <Text>Visit</Text>
            </Group>
          </Anchor>
        </Stack>
        <Stack
          maw={300}
          miw={300}
          mah={550}
          mih={550}
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
          <Box
            sx={{
              overflow: "hidden",
            }}
          >
            <Image
              sx={{
                objectFit: "cover",
              }}
              h={390}
              src="/sewa-phone.png"
            />
          </Box>
          <Text weight="bolder">🚘 mySewa</Text>
          <Text opacity={0.5} lineClamp={2}>
            A Car rental agents management platform.
          </Text>
          <Anchor
            size="xs"
            pos="absolute"
            sx={{
              left: 8,
              bottom: 8,
            }}
            href="https://mysewa.net/"
            target="_blank"
          >
            <Group>
              <ThemeIcon
                size="xs"
                color="gray"
                variant="light"
                bg="transparent"
              >
                <IconExternalLink />
              </ThemeIcon>
              <Text>Visit</Text>
            </Group>
          </Anchor>
        </Stack>
        <Stack
          maw={300}
          miw={300}
          mah={550}
          mih={550}
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
          <Box
            sx={{
              overflow: "hidden",
            }}
          >
            <Image h={390} src="/sales-phone.png" />
          </Box>
          <Text weight="bolder">📲 Sales Bane</Text>
          <Text opacity={0.5} lineClamp={2}>
            International Sales Management System (In development)
          </Text>
          <Anchor
            size="xs"
            pos="absolute"
            sx={{
              left: 8,
              bottom: 8,
            }}
            href="https://salesbane.app/"
            target="_blank"
          >
            <Group>
              <ThemeIcon
                size="xs"
                color="gray"
                variant="light"
                bg="transparent"
              >
                <IconExternalLink />
              </ThemeIcon>
              <Text>Visit</Text>
            </Group>
          </Anchor>
        </Stack>
      </Group>
    </Container>
  );
}
