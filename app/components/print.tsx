import {
  useMantineColorScheme,
  ActionIcon,
  Anchor,
  Box,
  Button,
  Card,
  Code,
  CopyButton,
  Group,
  Image,
  Stack,
  Text,
  Tooltip,
  useMantineTheme,
  Kbd,
  createStyles,
  Paper,
  ThemeIcon,
} from "@mantine/core";
import type { CardProps } from "@mantine/core";
import {
  IconArrowBigLeft,
  IconBrandWhatsapp,
  IconCheck,
  IconChevronLeft,
  IconCode,
  IconDownload,
  IconMail,
  IconMoonStars,
  IconPhone,
  IconPrinter,
  IconRotate,
  IconSun,
  IconUser,
} from "@tabler/icons-react";
import { MYFlag, YEFlag } from "mantine-flagpack";
import { cloneElement, forwardRef, useState } from "react";
import { usePrintical } from "printical";

import { QRCode } from "~/components/qrcode";

import { domain } from "~/utils/constants";
import { useNavigate } from "@remix-run/react";
import { useHotkeys } from "@mantine/hooks";
import { Touric } from "./touric/touric";
import { useTour } from "./touric/tour";
import { IconLink } from "~/remix";

// 11.69
const LABEL_HEIGHT = 11.685,
  LABEL_WIDTH = 8.27;

const Icon = ({ icon }: { icon: string }) => {
  const theme = useMantineTheme();
  return (
    <Box pos="relative">
      <Text color="orange" weight="bolder" size="xl">
        {icon}
        <Text span size="sm" ml={2}>
          +
        </Text>
      </Text>
    </Box>
  );
};
interface PrintProps extends Omit<CardProps, "children"> {
  color?: string;
}
const Print = forwardRef<HTMLDivElement, PrintProps>(
  ({ color = "orange", ...rest }, ref) => {
    const theme = useMantineTheme();
    return (
      <Card
        radius={0}
        // m={0}
        // p={0}
        id="printi"
        ref={ref}
        sx={{
          overflow: "hidden",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        mah={`${LABEL_HEIGHT}in`}
        h={`${LABEL_HEIGHT}in`}
        // h={`100%`}
        w={`${LABEL_WIDTH}in`}
        withBorder
        {...rest}
      >
        <Stack w="100%" h="100%">
          <Group spacing="xl">
            <Box pt={100}>
              <Box
                maw={200}
                w={200}
                h={200}
                sx={{
                  overflow: "hidden",
                  borderRadius: "4%",
                  background: `linear-gradient(rgb(0,0,0,0), rgb(0,0,0,0), ${
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.white
                  }), url("/face.jpg")`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                title="Ali Azzmzmi"
              />
            </Box>
            <Stack
              sx={{
                flex: 1,
              }}
              spacing={0}
              pt={100}
            >
              <Text color={color} weight="bolder" size="xl">
                Ali Azzmzmi
              </Text>
              <Text size="md">Full-Stack Web Developer</Text>
              <Stack pt="xs" w="100%" spacing={0}>
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
            <Stack align="start">
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
                <QRCode color={color} />
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
                  src={`/favicons/android-chrome-192x192.png`}
                  alt="Logo"
                />
              </Box>
            </Stack>
          </Group>
          <Stack align="center" my="auto">
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
          <Stack>
            <Group spacing="xs">
              <IconLink
                to="tel:+60137951707"
                target={"_blank"}
                // onClick={() => {
                //   window.open("tel:+60137951707", "_blank");
                // }}
                size="md"
                color="blue"
              >
                <IconPhone />
              </IconLink>
              <IconLink
                to="https://wa.me/60137951707"
                target={"_blank"}
                // onClick={() => {
                //   window.open("https://wa.me/60137951707", "_blank");
                // }}
                size="md"
                color="green"
              >
                <IconBrandWhatsapp />
              </IconLink>
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
              <IconLink
                to={`https://${domain}`}
                target={"_blank"}
                // onClick={() => {
                //   window.open(`https://${domain}`, "_blank");
                // }}
                size="md"
                color={color}
              >
                <IconUser />
              </IconLink>
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
        </Stack>
      </Card>
    );
  }
);
Print.displayName = "Print";

interface PrintProps extends Omit<CardProps, "children"> {
  color?: string;
}
const PrintContainer = forwardRef<HTMLDivElement, PrintProps>((props, ref) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const navigate = useNavigate();

  const { print, download, downloading, Printical } = usePrintical({
    pdfOptions: {
      filename: "Ali Azzmzmi.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 3,
      },
    },
  });
  useHotkeys([
    ["mod+P", print],
    ["mod+D", download, { preventDefault: true }],
  ]);

  const tour = useTour({ tourId: "pdf" });
  const first = tour.findFirstIncompleteStep()?.id;

  const [currentStep, setCurrentStep] = useState<string | undefined>(first);

  return (
    <>
      <Stack
        spacing="xs"
        pos="absolute"
        // pos="relative"
        sx={{
          left: 12,
          top: first ? 112 : 12,
          zIndex: 1000,
        }}
      >
        <Touric
          // containerProps={{
          //   style: {
          //     // marginTop: -50,
          //   },
          // }}
          tourId="pdf"
          stepId="print"
          enabled={currentStep === "print"}
          lockScroll={false}
          component={(props) => (
            <TourCard
              k="P"
              onComplete={() => {
                props.state.complete();
                setCurrentStep(props.state.next()?.id);
              }}
              icon={<IconPrinter />}
            >
              <Text span size="xl">
                👈{" "}
              </Text>
              Tap on this button to print the resume
            </TourCard>
          )}
        >
          <Button
            color={props.color}
            size="xs"
            onClick={print}
            leftIcon={<IconPrinter size={18} />}
          >
            Print
          </Button>
        </Touric>

        <Touric
          tourId="pdf"
          stepId="download"
          enabled={currentStep === "download"}
          // closeOnClickOutside={true}
          lockScroll={false}
          // withOverlay={true}
          component={(props) => (
            <TourCard
              k="D"
              onComplete={() => {
                props.state.complete();
                setCurrentStep(props.state.next()?.id);
              }}
              icon={<IconDownload />}
            >
              <Text span size="xl">
                👈{" "}
              </Text>
              Tap on this button to download the resume as a `PDF`
            </TourCard>
          )}
        >
          <Button
            loading={downloading}
            color={props.color}
            size="xs"
            onClick={download}
            leftIcon={<IconDownload size={18} />}
          >
            {downloading ? "Downloading" : "Download"}
          </Button>
        </Touric>
        <ActionIcon onClick={() => toggleColorScheme()} variant="default">
          {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>

        <Touric
          tourId="pdf"
          stepId="back"
          enabled={currentStep === "back"}
          lockScroll={false}
          component={(props) => (
            <TourCard
              onComplete={() => {
                props.state.complete();
                setCurrentStep(props.state.next()?.id);
              }}
              icon={<IconChevronLeft />}
            >
              <Text span size="xl">
                👈{" "}
              </Text>
              Tap on this button to go back
            </TourCard>
          )}
        >
          <ActionIcon onClick={() => navigate(-1)} variant="default">
            <IconChevronLeft size={18} />
          </ActionIcon>
        </Touric>
        <Touric
          tourId="pdf"
          stepId="reset"
          enabled={currentStep === "reset"}
          lockScroll={false}
          component={(props) => (
            <TourCard
              onComplete={() => {
                props.state.complete();
                setCurrentStep(props.state.next()?.id);
              }}
              icon={<IconRotate />}
            >
              <Text span size="xl">
                👈{" "}
              </Text>
              Tap on this button to restart this tutorial
            </TourCard>
          )}
        >
          <ActionIcon
            onClick={() => {
              tour.uncomplete();
              setCurrentStep("print");
            }}
            variant="default"
          >
            <IconRotate size={18} />
          </ActionIcon>
        </Touric>
      </Stack>
      <Printical>
        <Print />
      </Printical>
    </>
  );
});

PrintContainer.displayName = "PrintContainer";

export default PrintContainer;

const TourCard = ({ children, onComplete, icon, k }: any) => {
  const { classes } = useStyles();
  return (
    <Paper withBorder radius="md" className={classes.card} maw={250}>
      <ThemeIcon
        size="xl"
        radius="md"
        variant="gradient"
        gradient={{ deg: 0, from: "pink", to: "orange" }}
      >
        {cloneElement(icon)}
      </ThemeIcon>
      <Text size="sm" weight={500} mt="md">
        {children}
      </Text>
      {k && (
        <Text size="xs" mt="sm" color="dimmed">
          OR <Shortcut k={k} />
        </Text>
      )}
      <Button
        mt="xl"
        compact
        variant="gradient"
        gradient={{ deg: 0, from: "pink", to: "orange" }}
        radius={0}
        leftIcon={<IconCheck size={16} />}
        size="xs"
        onClick={onComplete}
      >
        Got it
      </Button>
    </Paper>
  );
};

const Shortcut = ({ k }: { k: string }) => {
  const { classes } = useStyles();
  return (
    <Text weight={700} color="inherit" display="inline">
      <Text span className={classes.shortcut}>
        ⌘
      </Text>
      +
      <Text span className={classes.shortcut}>
        {k}
      </Text>
    </Text>
  );
};

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 100ms ease",
    padding: theme.spacing.lg,
    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.02)",
    },

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
      backgroundImage: theme.fn.linearGradient(
        0,
        theme.colors.pink[6],
        theme.colors.orange[6]
      ),
    },
  },
  shortcut: {
    fontSize: 11,
    lineHeight: 1,
    padding: `4px 7px`,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: theme.radius.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
  },
}));
