import { Link as FluentLinkBase, type LinkProps as FluentLinkProps } from "@fluentui/react-components";
import { type LinkComponent, createLink } from "@tanstack/react-router";
import { forwardRef } from "react";

const FluentLink = forwardRef<HTMLAnchorElement, FluentLinkProps>((props, ref) => {
  return <FluentLinkBase {...props} ref={ref}>{props.children}</FluentLinkBase>;
});

FluentLink.displayName = "FluentLink";

const CreatedLinkComponent = createLink(FluentLink);

const Link: LinkComponent<typeof FluentLink> = (props) => {
  return <CreatedLinkComponent preload="intent" {...props} />;
};

export default Link;