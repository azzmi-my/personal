import { Link as RemixLink } from "@remix-run/react";
import { ActionIcon } from "@mantine/core";
import type { ActionIconProps } from "@mantine/core";
import type { RemixLinkProps } from "~/types";

interface IconLinkProps extends ActionIconProps {
  to: RemixLinkProps["to"];
  target?: React.HTMLAttributeAnchorTarget;
  children: React.ReactNode;
  replace?: RemixLinkProps["replace"];
}
export const IconLink: React.FC<IconLinkProps> = ({
  to,
  children,
  replace,
  ...rest
}) => {
  const isAbsolute = typeof to === "string" && to.startsWith("http");
  return isAbsolute ? (
    <ActionIcon component={"a"} href={to} {...rest}>
      {children}
    </ActionIcon>
  ) : (
    <ActionIcon<typeof RemixLink>
      component={RemixLink}
      to={to}
      replace={replace}
      {...rest}
    >
      {children}
    </ActionIcon>
  );
};
