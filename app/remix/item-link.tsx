import type { MenuItemProps } from "@mantine/core";
import { Menu } from "@mantine/core";
import type { LinkProps } from "@remix-run/react";
import { Link } from "@remix-run/react";

interface ItemLinkProps extends Omit<LinkProps, "color">, MenuItemProps {}
export const ItemLink = ({ children, to, ...props }: ItemLinkProps) => {
  return (
    <Menu.Item component={Link} to={to} {...props}>
      {children}
    </Menu.Item>
  );
};
