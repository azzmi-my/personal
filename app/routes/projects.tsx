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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Image h={390} src={project.image} /> */}
              <picture>
                <source srcSet={project.avif} type="image/avif" />
                {/* <source srcSet="image.webp" type="image/webp" /> */}
                <img
                  // width="1280"
                  width="300"
                  height="390"
                  decoding="async"
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                  loading="lazy"
                  src={project.png}
                  alt="an avif"
                />
              </picture>
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
        ))}
      </Group>
    </Container>
  );
}
