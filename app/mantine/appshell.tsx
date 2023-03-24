/* eslint-disable jsx-a11y/anchor-has-content */
import {
  ActionIcon,
  Anchor,
  BackgroundImage,
  Box,
  Code,
  CopyButton,
  Group,
  Header,
  Image,
  Indicator,
  MediaQuery,
  Navbar,
  Overlay,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import type { MantineColor, StackProps } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import {
  IconBrandGithub,
  IconBrandWhatsapp,
  IconChevronLeft,
  IconCode,
  IconDownload,
  IconGitBranch,
  IconGripHorizontal,
  IconGripVertical,
  IconHome,
  IconMail,
  IconMoonStars,
  IconPhone,
  IconSettings,
  IconSun,
  IconTerminal,
  IconUser,
} from "@tabler/icons-react";
import { MYFlag, YEFlag } from "mantine-flagpack";
import { useEffect, useState } from "react";
import { QRCode } from "~/components/qrcode";
import { useColor } from "~/hooks";
import { IconLink, NavLink } from "~/remix";
import { Arrows } from "~/components/arrows";
import { version } from "../../package.json";
import { Terminal, useTerminal } from "termical";
import {
  useClickOutside,
  useFocusTrap,
  useHotkeys,
  useMergedRef,
} from "@mantine/hooks";
import { useLockScroll } from "~/hooks/use-lock-scroll";
import { RemoveScroll } from "@mantine/core";
import { domain } from "~/utils/constants";

interface Props extends StackProps {
  color?: MantineColor;
}

const statusColor = "red";
const statusText = "Not looking";
// const statusColor = "green";
// const statusText = "Looking for a job";

export const AppShell = ({ children, color }: Props) => {
  const navigate = useNavigate();

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const focusTrapRef = useFocusTrap();
  const shouldLockScroll = useLockScroll({
    opened,
    transitionDuration: 200,
  });
  const clickOutsideRef = useClickOutside(() => setOpened(false));
  const mergedRef = useMergedRef(focusTrapRef, clickOutsideRef);

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const getColor = useColor();

  const { line } = useTerminal();
  useHotkeys([["mod+O", () => setOpened(!opened)]]);
  useHotkeys([["mod+H", () => navigate("/")]]);
  useHotkeys([["mod+D", () => navigate("/pdf"), { preventDefault: true }]]);

  useEffect(() => {
    line.reset();
  }, []);

  return (
    <Stack spacing={0}>
      <Header
        fixed
        height={50}
        p="md"
        sx={(theme) => ({
          background:
            theme.colorScheme === "dark"
              ? theme.fn.rgba(theme.colors.dark[8], 0.9)
              : theme.fn.rgba(theme.white, 0.9),
        })}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Group spacing={"xs"}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <ActionIcon size="sm" color={"gray"} onClick={() => navigate(-1)}>
                <IconChevronLeft />
              </ActionIcon>
            </MediaQuery>
            <MediaQuery largerThan="sm" styles={{}}>
              <Tooltip
                events={{ focus: true, hover: true, touch: true }}
                label="⌘ + O"
              >
                <ActionIcon
                  color={color}
                  onClick={
                    shouldLockScroll ? undefined : () => setOpened(!opened)
                  }
                  size="sm"
                >
                  {opened ? <IconGripVertical /> : <IconGripHorizontal />}
                </ActionIcon>
              </Tooltip>
            </MediaQuery>
          </Group>
          <Group bg="" align="end" spacing={4} p={0}>
            <Text
              lh={1}
              maw={100}
              size="xl"
              weight="bolder"
              variant="gradient"
              gradient={{
                from: theme.colors[color ?? "blue"]![5],
                to: theme.colorScheme === "dark" ? "gray.9" : "gray.0",
              }}
            >
              aZzmi
            </Text>
            <Box
              bg={
                theme.colorScheme === "dark"
                  ? theme.colors[color ?? "blue"]![0]
                  : theme.colors[color ?? "blue"]![9]
              }
              p={1}
              mb={1.5}
            >
              <Text
                sx={(theme) => ({
                  color: theme.colorScheme === "dark" ? "black" : "white",
                })}
                // color="white"
                tt="uppercase"
                lh={1}
                size={7}
                weight="bolder"
              >
                .app
              </Text>
            </Box>
          </Group>
          <Group>
            <Tooltip
              events={{ focus: true, hover: true, touch: true }}
              label="⌘ + J"
            >
              <ActionIcon
                variant="outline"
                color={dark ? "yellow" : "gray"}
                onClick={() => toggleColorScheme()}
                title="Toggle color scheme"
              >
                {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
              </ActionIcon>
            </Tooltip>
          </Group>
        </div>
      </Header>
      <Stack
        pt={150}
        sx={{
          zIndex: 0,
          overflow: "clip",
        }}
        h={400}
        maw={"100%"}
        p={"md"}
        pos="relative"
      >
        <Group
          sx={{
            background:
              theme.colorScheme === "dark"
                ? theme.fn.gradient({
                    from: theme.fn.rgba(theme.colors.cyan[8], 0.5),
                    to: theme.fn.rgba(theme.colors[color || "orange"]![8], 0.5),
                    deg: 90,
                  })
                : theme.fn.gradient({
                    from: theme.fn.rgba(theme.colors.cyan[4], 0.5),
                    to: theme.fn.rgba(theme.colors[color || "orange"]![4], 0.5),
                    deg: 90,
                  }),
            zIndex: 99,
          }}
          position="center"
          align="center"
        >
          <Tooltip
            events={{ focus: true, hover: true, touch: true }}
            label="⌘ + H"
          >
            <NavLink
              to={"/"}
              activeIcon={<IconHome size={18} />}
              icon={<IconHome size={18} />}
              label="Home"
            />
          </Tooltip>
          <NavLink
            to={"/techs"}
            activeIcon={<IconCode size={18} />}
            icon={<IconCode size={18} />}
            label="Techs"
          />
          <NavLink
            to={"/repos"}
            activeIcon={<IconGitBranch size={18} />}
            icon={<IconGitBranch size={18} />}
            label="Repositories"
          />
          <NavLink
            to={"/projects"}
            activeIcon={<IconSettings size={18} />}
            icon={<IconSettings size={18} />}
            label="Projects"
          />
        </Group>
        <Box
          pos="absolute"
          h="100%"
          w="100%"
          sx={{
            left: 0,
            right: 0,
            top: 0,
            zIndex: 1,
          }}
        >
          <Overlay
            gradient={`linear-gradient(180deg, rgba(0,0,0,0)0%, rgba(0,0,0,0)50%, ${
              theme.colorScheme === "dark"
                ? theme.fn.rgba(theme.colors.dark[7], 1)
                : theme.fn.rgba(theme.white, 1)
            }100%)`}
            opacity={0.85}
          />
        </Box>
        <Box
          pos="absolute"
          h="100%"
          w="100%"
          maw={400}
          sx={{
            left: -90,
            top: -50,
            zIndex: 0,
          }}
        >
          <Box
            bg={getColor("cyan")}
            sx={{
              position: "absolute",
              left: -0,
              top: -0,
              zIndex: 0,
              height: 200,
              width: 200,
              borderRadius: 100,
              filter: "blur(200px) opacity(0.8)",
            }}
          />
          <Box opacity={0.7}>
            <Arrows color={getColor("cyan")} />
          </Box>
          <Box
            sx={{
              filter: "blur(5px)",
              transform: "scale(1.1)",
            }}
          >
            <Arrows color={getColor("cyan")} />
          </Box>
        </Box>
        <Box
          pos="absolute"
          h="100%"
          w="100%"
          maw={400}
          sx={{
            right: -100,
            bottom: -50,
            zIndex: 0,
          }}
        >
          <Box
            bg={getColor(color || "red")}
            sx={{
              position: "absolute",
              right: -0,
              bottom: -0,
              zIndex: 0,
              height: 200,
              width: 200,
              borderRadius: 100,
              filter: "blur(200px) opacity(0.5)",
            }}
          />
          <Box opacity={0.7}>
            <Arrows color={getColor(color || "red")} />
          </Box>
          <Box
            sx={{
              filter: "blur(5px)",
              transform: "scale(1.1)",
            }}
          >
            <Arrows color={getColor(color || "red")} />
          </Box>{" "}
        </Box>
      </Stack>
      <Group
        sx={{
          zIndex: 1,
        }}
        align="start"
        position="center"
      >
        <RemoveScroll enabled={shouldLockScroll}>
          <Navbar
            ref={mergedRef}
            p="md"
            fixed
            hiddenBreakpoint="xl"
            hidden={!opened}
            width={{ sm: 300, lg: 300 }}
            sx={{
              background: theme.fn.rgba(
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.white,
                0.8
              ),
              backdropFilter: "blur(10px)",
            }}
          >
            <Box pos="absolute">
              <IconLink to="/pdf" color={color}>
                <IconDownload />
              </IconLink>
            </Box>
            <Navbar.Section mt="xs">
              <Box w={100} h={100} mr="auto" ml="auto">
                <Image src="/port.svg" alt="Logo" />
              </Box>
            </Navbar.Section>
            <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
              <Navbar.Section mt="xs">
                <Stack align="center">
                  <Stack spacing={0}>
                    <Text
                      maw={90}
                      variant="gradient"
                      gradient={{
                        from: theme.colors[color ?? "blue"]![3],
                        to: theme.colors[color ?? "blue"]![7],
                      }}
                      weight="bolder"
                    >
                      Ali Azzmzmi
                    </Text>
                    <Text size="xs">Full-Stack Web Developer</Text>
                  </Stack>
                  <Box
                    w="100%"
                    maw={200}
                    h={164}
                    mr="auto"
                    ml="auto"
                    sx={{
                      overflow: "hidden",
                      borderRadius: "4%",
                      background: `linear-gradient(rgb(0,0,0,0), rgb(0,0,0,0), ${
                        theme.colorScheme === "dark"
                          ? theme.colors.dark[7]
                          : "white"
                      }), url("/face.jpg")`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                    title="Ali Azzmzmi"
                  />
                  <Stack w="100%" spacing={0}>
                    <Code w={75}>👶 ~1994</Code>
                    <Group>
                      <YEFlag w={12} radius="xs" />
                      <Text>
                        born in{" "}
                        <Anchor
                          color={color}
                          href="https://en.wikipedia.org/wiki/Yemen"
                          target="_blank"
                        >
                          Yemen
                        </Anchor>
                      </Text>
                    </Group>
                    <Group>
                      <MYFlag w={12} radius="xs" />
                      <Text>
                        lives in{" "}
                        <Anchor
                          color={color}
                          href="https://en.wikipedia.org/wiki/Malaysia"
                          target="_blank"
                        >
                          Malaysia
                        </Anchor>
                      </Text>
                    </Group>
                    <Group>
                      <IconCode size={12} />
                      <Text>
                        with{" "}
                        <Anchor
                          color={color}
                          href="https://en.wikipedia.org/wiki/JavaScript"
                          target="_blank"
                        >
                          Javascript
                        </Anchor>{" "}
                        Stack
                      </Text>
                    </Group>
                  </Stack>
                </Stack>
              </Navbar.Section>
              <Navbar.Section h={300}>
                <Stack align="center" justify="center" h="100%" w="100%">
                  <Box
                    w={150}
                    h={150}
                    sx={(theme) => ({
                      borderStyle: "solid",
                      borderColor:
                        theme.colorScheme === "dark"
                          ? theme.colors.gray[7]
                          : theme.colors.gray[2],
                      borderWidth: "1px",
                      borderRadius: "4%",
                    })}
                    pos="relative"
                  >
                    <QRCode color={getColor(color ?? "gray")} />
                    <Image
                      sx={{
                        position: "absolute",
                        // top: 0,
                        // bottom: 0,
                        // left: 0,
                        // right: 0,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      width={50}
                      height={50}
                      src="/port.svg"
                      alt="Logo"
                    />
                  </Box>
                </Stack>
              </Navbar.Section>
              <Navbar.Section>
                <Stack>
                  <Group spacing="xs">
                    <ActionIcon
                      onClick={() => {
                        window.open("tel:+60137951707", "_blank");
                      }}
                      size="md"
                      color="blue"
                    >
                      <IconPhone />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => {
                        window.open("https://wa.me/60137951707", "_blank");
                      }}
                      size="md"
                      color="green"
                    >
                      <IconBrandWhatsapp />
                    </ActionIcon>
                    <CopyButton value="+60137951707">
                      {({ copied, copy }) => (
                        <Tooltip
                          label={copied ? "Copied!" : "Copy to clipboard"}
                          events={{ focus: true, hover: true, touch: true }}
                        >
                          <Text onClick={copy} weight="bolder" size="lg">
                            +60 13-795 1707
                          </Text>
                        </Tooltip>
                      )}
                    </CopyButton>
                  </Group>
                  <Group spacing="xs">
                    <ActionIcon
                      onClick={() => {
                        window.open("mailto:azzmzmiali@gmail.com", "_blank");
                      }}
                      size="md"
                      color="red"
                    >
                      <IconMail />
                    </ActionIcon>
                    <CopyButton value="azzmzmiali@gmail.com">
                      {({ copied, copy }) => (
                        <Tooltip
                          label={copied ? "Copied!" : "Copy to clipboard"}
                          events={{ focus: true, hover: true, touch: true }}
                        >
                          <Text onClick={copy} weight="bolder" size="lg">
                            azzmzmiali@gmail.com
                          </Text>
                        </Tooltip>
                      )}
                    </CopyButton>
                  </Group>
                  <Group spacing="xs">
                    <ActionIcon
                      onClick={() => {
                        window.open(`https://${domain}`, "_blank");
                      }}
                      size="md"
                      color={color}
                    >
                      <IconUser />
                    </ActionIcon>
                    <CopyButton value={domain}>
                      {({ copied, copy }) => (
                        <Tooltip
                          label={copied ? "Copied!" : "Copy to clipboard"}
                          events={{ focus: true, hover: true, touch: true }}
                        >
                          <Text onClick={copy} weight="bolder" size="lg">
                            {domain}
                          </Text>
                        </Tooltip>
                      )}
                    </CopyButton>
                  </Group>
                </Stack>
              </Navbar.Section>
            </Navbar.Section>
          </Navbar>
        </RemoveScroll>
        <Box
          style={{
            // maxHeight: 400,
            height: 500,
            maxWidth: 400,
            width: "100%",
          }}
          mt={-100}
          px="md"
        >
          <Terminal
            commands={[
              {
                text: "qr",
                description: "Show QR code",
                action({ value, ctx }) {
                  ctx.line.add({
                    content: (
                      <Stack align="center" w="100%">
                        <Box
                          w={150}
                          h={150}
                          sx={(theme) => ({
                            borderStyle: "solid",
                            borderColor:
                              theme.colorScheme === "dark"
                                ? theme.colors.gray[7]
                                : theme.colors.gray[2],
                            borderWidth: "1px",
                            borderRadius: "4%",
                          })}
                          pos="relative"
                        >
                          <QRCode color={getColor(color ?? "gray")} />
                          <Image
                            sx={{
                              position: "absolute",
                              // top: 0,
                              // bottom: 0,
                              // left: 0,
                              // right: 0,
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                            width={50}
                            height={50}
                            src="/port.svg"
                            alt="Logo"
                          />
                        </Box>
                      </Stack>
                    ),
                    id: Math.random().toString(),
                    timestamp: new Date(),
                  });
                },
              },
              {
                text: "color",
                description: "Switch color mode (dark/light)",
                action(args) {
                  toggleColorScheme();
                },
              },
              {
                text: "repos",
                description: "Show my repositories",
                action(args) {
                  navigate("/repos");
                },
              },
              {
                text: "techs",
                description: "Techs I use",
                action(args) {
                  navigate("/techs");
                },
              },
              {
                text: "work",
                description: "Show my projects",
                action(args) {
                  navigate("/projects");
                },
              },
              {
                text: "call",
                description: "Call me",
                action(args) {
                  window.open("tel:+60137951707", "_blank");
                },
              },
              {
                text: "email",
                description: "Email me",
                action(args) {
                  window.open("mailto:azzmzmiali@gmail.com", "_blank");
                },
              },
              {
                text: "wa",
                description: "Whatsapp me",
                action(args) {
                  window.open("https://wa.me/60137951707", "_blank");
                },
              },
              {
                text: "pic",
                description: "tHe HanDsOMe mE 😌😌✨",
                action({ value, ctx }) {
                  ctx.line.add({
                    content: (
                      <Stack>
                        <Box
                          // w="100%"
                          maw={200}
                          w={164}
                          h={164}
                          mr="auto"
                          ml="auto"
                          sx={{
                            overflow: "hidden",
                            borderRadius: "4%",
                            background: `linear-gradient(rgb(0,0,0,0), rgb(0,0,0,0), ${
                              theme.colorScheme === "dark"
                                ? theme.colors.dark[7]
                                : "white"
                            }), url("/face.jpg")`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}
                          title="Ali Azzmzmi"
                        />
                      </Stack>
                    ),
                    id: Math.random().toString(),
                    timestamp: new Date(),
                  });
                },
              },
              {
                text: "contact",
                description: "Show contact info",
                action({ value, ctx }) {
                  ctx.line.add({
                    content: (
                      <Stack>
                        <Group spacing="xs">
                          <ActionIcon
                            onClick={() => {
                              window.open("tel:+60137951707", "_blank");
                            }}
                            size="md"
                            color="blue"
                          >
                            <IconPhone />
                          </ActionIcon>
                          <ActionIcon
                            onClick={() => {
                              window.open(
                                "https://wa.me/60137951707",
                                "_blank"
                              );
                            }}
                            size="md"
                            color="green"
                          >
                            <IconBrandWhatsapp />
                          </ActionIcon>
                          <CopyButton value="+60137951707">
                            {({ copied, copy }) => (
                              <Tooltip
                                label={copied ? "Copied!" : "Copy to clipboard"}
                                events={{
                                  focus: true,
                                  hover: true,
                                  touch: true,
                                }}
                              >
                                <Text onClick={copy} weight="bolder" size="lg">
                                  +60 13-795 1707
                                </Text>
                              </Tooltip>
                            )}
                          </CopyButton>
                        </Group>
                        <Group spacing="xs">
                          <ActionIcon
                            onClick={() => {
                              window.open(
                                "mailto:azzmzmiali@gmail.com",
                                "_blank"
                              );
                            }}
                            size="md"
                            color="red"
                          >
                            <IconMail />
                          </ActionIcon>
                          <CopyButton value="azzmzmiali@gmail.com">
                            {({ copied, copy }) => (
                              <Tooltip
                                label={copied ? "Copied!" : "Copy to clipboard"}
                                events={{
                                  focus: true,
                                  hover: true,
                                  touch: true,
                                }}
                              >
                                <Text onClick={copy} weight="bolder" size="lg">
                                  azzmzmiali@gmail.com
                                </Text>
                              </Tooltip>
                            )}
                          </CopyButton>
                        </Group>
                        <Group spacing="xs">
                          <ActionIcon
                            onClick={() => {
                              window.open(`https://${domain}`, "_blank");
                            }}
                            size="md"
                            color={color}
                          >
                            <IconUser />
                          </ActionIcon>
                          <CopyButton value={domain}>
                            {({ copied, copy }) => (
                              <Tooltip
                                label={copied ? "Copied!" : "Copy to clipboard"}
                                events={{
                                  focus: true,
                                  hover: true,
                                  touch: true,
                                }}
                              >
                                <Text onClick={copy} weight="bolder" size="lg">
                                  {domain}
                                </Text>
                              </Tooltip>
                            )}
                          </CopyButton>
                        </Group>
                      </Stack>
                    ),
                    id: Math.random().toString(),
                    timestamp: new Date(),
                  });
                },
              },
              {
                text: "download",
                description: "Download my resume",
                action({ value, ctx }) {
                  navigate("/pdf");
                },
              },
            ]}
            title={`aZmmi@${version}`}
            prefix={
              <Group spacing={0} position="center" noWrap pr="xs">
                <ThemeIcon size="xs" variant="light" bg="transparent">
                  <IconTerminal />
                </ThemeIcon>
                <Text
                  sx={{
                    // animation: "blinking-cursor 1s step-end infinite",

                    "@keyframes blinking-cursor": {
                      "0%": {
                        opacity: 1,
                      },
                      "50%": {
                        opacity: 0,
                      },
                      "100%": {
                        opacity: 1,
                      },
                    },
                  }}
                >
                  #
                </Text>
              </Group>
            }
            theme={{
              header: {
                text: {
                  letterSpacing: "0.1em",
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[0]
                      : theme.colors.dark[9],
                },
                container: {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[9]
                      : theme.colors.dark[0],
                },
              },
              body: {
                container: {
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[5]
                      : theme.colors.gray[1],
                  color:
                    theme.colorScheme === "dark"
                      ? theme.colors.gray[1]
                      : theme.colors.dark[7],
                },
                scrollbar: {
                  thumb: {
                    backgroundColor:
                      theme.colorScheme === "dark" ? "#fff" : "#000",
                  },
                  track: {
                    background:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[8]
                        : theme.colors.gray[2],
                  },
                },
                scrollArea: {
                  paddingLeft: 12,
                  paddingRight: 12,
                },
              },
            }}
          >
            <Stack>
              <Stack spacing={0}>
                <Text>Hey 🙂✌️!!</Text>
                <Text weight="bolder" color={theme.primaryColor}>
                  I am Ali Azzmzmi
                </Text>
              </Stack>
              <Stack spacing={0}>
                <Text weight="bolder">Recruitment Status</Text>
                <Box pl="sm">
                  <Indicator
                    color={statusColor}
                    // size="md"
                    processing
                    position="middle-start"
                  >
                    <Text color={statusColor} pl="sm">
                      {statusText}
                    </Text>
                  </Indicator>
                </Box>
              </Stack>
              <Stack spacing={0} pb="xl">
                <Text>Facts about me:</Text>
                <Text>👉 Autodidact 😁</Text>
                <Text>⚙️ Workaholic 🤓</Text>
                <Text>💻 Typescript lover ❤️</Text>
                <Text>💻 Fullstack web dev ✅</Text>
                <Text>💻 A designer 😞🟢</Text>
                <Text>✨ Knocked UI/UX out 😵‍💫💫</Text>
                <Text>📚 Currently learning Rust 🦀</Text>
                <Text>⚡ Don't like pets 🐶...</Text>
              </Stack>
              <Text>Type 'help' to see available commands</Text>
            </Stack>
          </Terminal>
        </Box>
        {children}
      </Group>
    </Stack>
  );
};
