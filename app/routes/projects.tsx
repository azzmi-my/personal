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
import { IconExternalLink } from "@tabler/icons-react";
import { wd } from "~/utils/data";

export default function Projects() {
  const data = wd();

  return (
    <Container size="sm">
      <Group spacing="xl" pb="xl" position="center">
        {data.projects.map((project) => (
          <Stack
            key={project.title}
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
<<<<<<< HEAD
            >
              <Image h={390} src={project.image} />
            </Box>
            <Text weight="bolder">
              {project.icon} {project.title}
            </Text>
            <Text opacity={0.5} lineClamp={2}>
              {project.description}
            </Text>
            <Anchor
              size="xs"
              pos="absolute"
              sx={{
                left: 8,
                bottom: 8,
              }}
              href={project.url}
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
        ))}{" "}
=======
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
            href="https://website-2e2a.fly.dev/"
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
            <Image h={390} src="/ishop-front.png" />
          </Box>
          <Text weight="bolder">🛒 iShop</Text>
          <Text opacity={0.5} lineClamp={2}>
            A demo of a SAAS application, of an E-commerce storefront web app that boosts customer
            conversion using AI-powered personalization and dynamic pricing.
          </Text>
          <Anchor
            size="xs"
            pos="absolute"
            sx={{
              left: 8,
              bottom: 8,
            }}
            href="https://ishop.run/"
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
            <Image h={390} src="/aureus-nav.png" />
          </Box>
          <Text weight="bolder">🔰 Aureus.run</Text>
          <Text opacity={0.5} lineClamp={2}>
            Almost ERP (In progress)
          </Text>
          <Anchor
            size="xs"
            pos="absolute"
            sx={{
              left: 8,
              bottom: 8,
            }}
            href="https://aureus.run/"
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
>>>>>>> f658a865c48ddbbf85665920828c1a166f754646
      </Group>
    </Container>
  );
}
