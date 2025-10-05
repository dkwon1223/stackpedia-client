import { Dropdown, DropdownButton, DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu } from "@/components/catalyst/dropdown";
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/components/catalyst/navbar";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRightStartOnRectangleIcon, Cog8ToothIcon, LightBulbIcon, ShieldCheckIcon, UserIcon } from "@heroicons/react/16/solid";

const MobileNav = () => {
  const { logout } = useAuth();
  return (
    <>
        <Navbar>
            <NavbarSpacer />
            <NavbarSection>
            <Dropdown>
                <DropdownButton as={NavbarItem}>
                <UserIcon />
                </DropdownButton>
                <DropdownMenu className="min-w-64" anchor="bottom end">
                <DropdownItem href="/my-profile">
                    <UserIcon />
                    <DropdownLabel>My profile</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/settings">
                    <Cog8ToothIcon />
                    <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/privacy-policy">
                    <ShieldCheckIcon />
                    <DropdownLabel>Privacy policy</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/share-feedback">
                    <LightBulbIcon />
                    <DropdownLabel>Share feedback</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem onClick={logout}>
                    <ArrowRightStartOnRectangleIcon />
                    <DropdownLabel>Sign out</DropdownLabel>
                </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            </NavbarSection>
        </Navbar>
    </>
  );
};

export default MobileNav;