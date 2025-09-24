import type { HeroNavConfig, WebNavConfig } from "@/types/navigation";
import { ArrowRightStartOnRectangleIcon, Cog8ToothIcon, HomeIcon, InformationCircleIcon, LightBulbIcon, PresentationChartBarIcon, QuestionMarkCircleIcon, ShieldCheckIcon, SparklesIcon, Square3Stack3DIcon, UserIcon, WrenchScrewdriverIcon } from "@heroicons/react/16/solid";

export const HERO_NAV_CONFIG: HeroNavConfig = {
    heroNavItems: [
        {
            label: 'Product',
            href: '/product'
        },
        {
            label: 'Features',
            href: '/features'
        },
        {
            label: 'Community',
            href: '/community'
        },
    ]
};

export const WEB_NAV_CONFIG: WebNavConfig = {
    header: {
        appName: 'StackPedia',
        avatarSrc: '/stack.svg',
        dropdownItems: [
            {
                href: 'settings',
                icon: Cog8ToothIcon,
                label: 'Settings'
            },
            {
                divider: true
            },
            {
                href: '/',
                icon: InformationCircleIcon,
                label: 'Marketing'
            },
            {
                href: '/privacy-policy',
                icon: ShieldCheckIcon,
                label: 'Privacy policy'
            },
            {
                href: 'share-feedback',
                icon: LightBulbIcon,
                label: 'Share feedback'
            }
        ]
    },
    body: {
        mainNavItems: [
            {
                href: '/app',
                icon: HomeIcon,
                label: 'Home'
            },
            {
                href: 'technologies',
                icon: WrenchScrewdriverIcon,
                label: 'Technologies'
            },
            {
                href: 'stacks',
                icon: Square3Stack3DIcon,
                label: 'Stacks'
            },
            {
                href: 'projects',
                icon: PresentationChartBarIcon,
                label: 'Projects'
            },
        ],
        lowerNavItems: [
            {
                href: 'support',
                icon: QuestionMarkCircleIcon,
                label: 'Support'
            },
            {
                href: 'changelog',
                icon: SparklesIcon,
                label: 'Changelog'
            }
        ]
    },
    footer: {
        userName: 'Erica',
        userEmail: 'erica@example.com',
        dropdownItems: [
            {
                href: 'my-profile',
                icon: UserIcon,
                label: 'My profile'
            },
            {
                href: 'settings',
                icon: Cog8ToothIcon,
                label: 'Settings'
            },
            {
                divider: true
            },
            {
                href: '/privacy-policy',
                icon: ShieldCheckIcon,
                label: 'Privacy policy'
            },
            {
                href: 'share-feedback',
                icon: LightBulbIcon,
                label: 'Share feedback'
            },
            {
                divider: true
            },
            {
                href: '/',
                icon: ArrowRightStartOnRectangleIcon,
                label: 'Sign out'
            }
        ]
    }
};