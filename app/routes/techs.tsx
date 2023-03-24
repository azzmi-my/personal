import {
  Anchor,
  Container,
  Group,
  Image,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";

export default function Techs() {
  const theme = useMantineTheme();
  return (
    <Container size="sm">
      <Group py="xl" mt="lg" spacing="xl" position="center">
        {techs(theme.colorScheme === "dark").map((img, index) => (
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

const techs = (dark?: boolean) => [
  {
    src: "/logos/aws.svg",
    alt: "Amazon Web Services",
    href: "https://aws.amazon.com/",
  },
  {
    src: "/logos/gdev.svg",
    alt: "Google Developers Tools",
    href: "https://developers.google.com/",
  },
  {
    src: "https://user-images.githubusercontent.com/1500684/157764397-ccd8ea10-b8aa-4772-a99b-35de937319e1.svg",
    alt: "Fly.io",
    href: "https://fly.io",
  },
  {
    src: `/logos/${!dark ? "vercel-icon-dark" : "vercel-icon-light"}.svg`,
    alt: "Vercel",
    href: "https://vercel.com",
  },
  {
    src: "/logos/docker.svg",
    alt: "docker",
    href: "https://www.nginx.com/",
  },
  {
    src: "/logos/nginx.svg",
    alt: "NGINX",
    href: "https://docker.com",
  },
  {
    src: "https://user-images.githubusercontent.com/1500684/157764484-ad64a21a-d7fb-47e3-8669-ec046da20c1f.svg",
    alt: "Prisma",
    href: "https://prisma.io",
  },
  {
    src: "/logos/node.svg",
    alt: "NodeJS",
    href: "https://nodejs.org",
  },
  {
    src: "/logos/tailwind.svg",
    alt: "Tailwind",
    href: "https://tailwindcss.com",
  },
  {
    src: "https://user-images.githubusercontent.com/1500684/157764454-48ac8c71-a2a9-4b5e-b19c-edef8b8953d6.svg",
    alt: "Cypress",
    href: "https://www.cypress.io",
  },
  {
    src: "/logos/MongoDB_Fores-Green.svg",
    alt: "MongoDB",
    href: "https://www.mongodb.com/",
  },
  {
    src: "https://user-images.githubusercontent.com/1500684/158238105-e7279a0c-1640-40db-86b0-3d3a10aab824.svg",
    alt: "PostgreSQL",
    href: "https://www.postgresql.org/",
  },
  {
    src: "/logos/react.svg",
    alt: "ReactJS",
    href: "https://www.reactjs.org/",
  },
  {
    src: `/logos/${
      !dark ? "nextjs-icon-dark-background" : "nextjs-icon-light-background"
    }.svg`,
    alt: "NextJS",
    href: "https://www.nextjs.org/",
  },
  {
    src: "/logos/remix.svg",
    alt: "RemixJS",
    href: "https://www.remix.run/",
  },
  {
    src: `/logos/${!dark ? "logo-storybook-default" : "story"}.svg`,
    alt: "Storybook",
    href: "https://storybook.js.org/",
  },
  {
    src: "https://user-images.githubusercontent.com/1500684/157772386-75444196-0604-4340-af28-53b236faa182.svg",
    alt: "MSW",
    href: "https://mswjs.io",
  },
  {
    src: "https://user-images.githubusercontent.com/1500684/157772447-00fccdce-9d12-46a3-8bb4-fac612cdc949.svg",
    alt: "Vitest",
    href: "https://vitest.dev",
  },
  {
    src: "https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png",
    alt: "Testing Library",
    href: "https://testing-library.com",
  },
  {
    src: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
    alt: "TypeScript",
    href: "https://typescriptlang.org",
  },
];
