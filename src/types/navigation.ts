export type HeroNavConfig = {
    heroNavItems: BaseNavItem[];
}

export type WebNavConfig = {
    header: {
        appName: string;
        avatarSrc: string;
        dropdownItems: DropdownItem[];
    }
    body: {
        mainNavItems: BaseNavItem[];
        lowerNavItems: BaseNavItem[];
    }
    footer: {
        dropdownItems: DropdownItem[];
    }
}

export type BaseNavItem = {
    href?: string;
    icon?: IconComponent;
    label?: string;
}

export type DropdownItem = BaseNavItem & { divider? : boolean };

export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

