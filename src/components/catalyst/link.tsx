import * as Headless from '@headlessui/react';
import React, { forwardRef } from 'react';
import { 
  Link as ReactRouterLink, 
  type LinkProps as ReactRouterLinkProps 
} from 'react-router';

export const Link = forwardRef(function Link(
  props: { href: string | ReactRouterLinkProps['to'] } & Omit<ReactRouterLinkProps, 'to'>,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Headless.DataInteractive>
      <ReactRouterLink {...props} to={props.href} ref={ref} />
    </Headless.DataInteractive>
  );
});
