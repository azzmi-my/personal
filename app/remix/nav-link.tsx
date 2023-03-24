import { NavLink as RemixNavLink } from "@remix-run/react";
import {
  ActionIcon,
  NavLink as MantineNavLink,
  useMantineTheme,
} from "@mantine/core";
import type {
  NavLinkProps as MantineNavLinkProps,
  ActionIconProps,
} from "@mantine/core";

import type { RemixNavLinkProps } from "~/types";
import { forwardRef } from "react";

interface NavLinkProps extends Omit<MantineNavLinkProps, "styles"> {
  //   children?: RemixNavLinkProps["children"];
  to: RemixNavLinkProps["to"];
  icon?: MantineNavLinkProps["icon"];
  activeIcon?: MantineNavLinkProps["icon"];
  styles?: MantineNavLinkProps["styles"];
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, icon, activeIcon, styles, ...props }, ref) => {
    const theme = useMantineTheme();
    return (
      <RemixNavLink style={{ all: "unset" }} ref={ref} to={to}>
        {({ isActive }) => (
          <MantineNavLink
            {...props}
            styles={{
              label: {
                fontSize: 16,
                color:
                  theme.colorScheme === "dark"
                    ? theme.white
                    : theme.colors.gray[7],
              },
              root: {
                color:
                  theme.colorScheme === "dark"
                    ? theme.colors.gray[3]
                    : theme.colors.gray[6],
              },
              description: {
                opacity: 0.7,
                fontFamily: "monospace",
                // letterSpacing: 1,
                fontWeight: 400,
              },
            }}
            sx={{
              fontWeight: 700,
            }}
            icon={isActive ? (activeIcon ? activeIcon : icon) : icon}
            active={isActive}
            rightSection={<></>}
          />
        )}
      </RemixNavLink>
    );
  }
);

NavLink.displayName = "NavLink";

interface IconNavLinkProps extends ActionIconProps {
  to: RemixNavLinkProps["to"];
  icon?: MantineNavLinkProps["icon"];
  activeIcon?: MantineNavLinkProps["icon"];
}

export const IconNavLink: React.FC<IconNavLinkProps> = ({
  to,
  icon,
  activeIcon,
  ...props
}) => {
  return (
    <RemixNavLink end style={{ all: "unset" }} to={to}>
      {({ isActive }) => (
        <ActionIcon
          sx={{
            borderBottom: isActive ? "2px solid" : "none",
            width: "100%",
            height: "100%",
            transform: "translateY(2px)",
          }}
          color={isActive ? "primaryColor" : "gray"}
          variant="subtle"
          size="xl"
          {...props}
        >
          {isActive ? (activeIcon ? activeIcon : icon) : icon}
        </ActionIcon>
      )}
    </RemixNavLink>
  );
};
