export type Await<Type> = Type extends Promise<infer Value>
  ? Await<Value>
  : Type;

export type Handle = {
  id?: string;
  color?: string;
  noLoader?: boolean;
  noLayout?: boolean;
};

export type {
  LinkProps as RemixLinkProps,
  NavLinkProps as RemixNavLinkProps,
} from "@remix-run/react";
