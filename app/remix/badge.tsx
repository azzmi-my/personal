import { Badge as MBadge } from "@mantine/core";
import type { BadgeProps as MBadgeProps, MantineColor } from "@mantine/core";
import { useNavigate } from "@remix-run/react";
import type { RemixLinkProps } from "~/types";

export interface BadgeProps extends MBadgeProps {
  to: RemixLinkProps["to"];
  children: React.ReactNode;
  color?: MantineColor;
}
export const InteractiveBadge: React.FC<BadgeProps> = ({
  to,
  children,
  color = "gray",
  ...rest
}) => {
  const navigate = useNavigate();
  return (
    // <MBadge<typeof RemixLink>
    <MBadge
      sx={(theme) => ({
        cursor: "pointer",
        "&:hover": {
          backgroundColor: theme.colors[color]![5],
        },
      })}
      onClick={() => navigate(to)}
      variant={"filled"}
      color={color}
      // color="dark"
      {...rest}
    >
      {children}
    </MBadge>
  );
};
