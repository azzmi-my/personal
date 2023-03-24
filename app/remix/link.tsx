import { Button, Anchor as MantineAnchor } from "@mantine/core";
import type {
  ButtonProps,
  AnchorProps as MantineAnchorProps,
} from "@mantine/core";
import { Link as RemixLink } from "@remix-run/react";
import type { RemixLinkProps } from "~/types";

export interface LinkProps extends ButtonProps {
  to: RemixLinkProps["to"];
  children: React.ReactNode;
}
export const Link: React.FC<LinkProps> = ({ to, children, ...rest }) => {
  return (
    <Button<typeof RemixLink>
      component={RemixLink}
      to={to}
      variant={"subtle"}
      // color="dark"
      color="gray"
      {...rest}
    >
      {children}
    </Button>
  );
};

export interface AnchorProps extends Omit<MantineAnchorProps, "href"> {
  to: RemixLinkProps["to"];
  children: React.ReactNode;
}
export const Anchor: React.FC<AnchorProps> = ({ to, children, ...rest }) => {
  return (
    <MantineAnchor<typeof RemixLink>
      component={RemixLink}
      to={to}
      // color="dark"
      underline={false}
      sx={(theme) => ({
        position: "relative",

        "&::before": {
          content: '""',
          position: "absolute",
          top: "100%",
          width: "100%",
          left: 0,
          height: "3px",
          borderRadius: "2px",
          background: `linear-gradient(111.3deg, ${theme.colors["blue"][5]} 9.6%, ${theme.colors["cyan"][5]} 93.6%)`,
          transition: "width 0.3s ease",
        },
        "&:hover": {
          opacity: 0.5,
        },
      })}
      {...rest}
    >
      {children}
    </MantineAnchor>
  );
};
