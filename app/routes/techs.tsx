import {
  Anchor,
  Container,
  Group,
  Image,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { wd } from "~/utils/data";

export default function Techs() {
  const theme = useMantineTheme();
  const data = wd();
  return (
    <Container size="sm">
      <Group py="xl" mt="lg" spacing="xl" position="center">
        {data.techs(theme.colorScheme === "dark").map((img, index) => (
          <Tooltip label={img.alt} key={index}>
            <Anchor
              key={img.href}
              href={img.href}
              target="_blank"
              sx={{
                "&:hover": {
                  filter: "grayscale(0)",
                },
                "&:focus": {
                  filter: "grayscale(0)",
                },
                filter: "grayscale(100%)",
                transition: "filter 0.2s ease",
                // padding: 0.25 * 16,
                width: 8 * 16,
                height: 4 * 16,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              p="xl"
            >
              <Image
                alt={img.alt}
                src={img.src}
                sx={{
                  objectFit: "contain",
                }}
              />
            </Anchor>
          </Tooltip>
        ))}
      </Group>
    </Container>
  );
}
