import {
  Anchor,
  Container,
  Group,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { wd } from "~/utils/data";

export default function Repos() {
  const data = wd();
  return (
    <Container size="sm">
      <Group spacing="xl" position="center" pb="xl">
        {data.repositories.map((repo) => (
          <Stack
            key={repo.title}
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
            <Text weight="bolder">
              {repo.icon} {repo.title}
            </Text>
            <Text opacity={0.5} lineClamp={2}>
              {repo.description}
            </Text>
            <Anchor
              size="xs"
              pos="absolute"
              sx={{
                left: 8,
                bottom: 8,
              }}
              href={repo.url}
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
        ))}{" "}
      </Group>
    </Container>
  );
}
