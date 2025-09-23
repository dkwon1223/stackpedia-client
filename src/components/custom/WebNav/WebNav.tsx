import { Avatar } from "@/components/catalyst/avatar";
import { Dropdown, DropdownButton, DropdownDivider, DropdownItem, DropdownLabel, DropdownMenu } from "@/components/catalyst/dropdown";
import { Sidebar, SidebarBody, SidebarFooter, SidebarHeader, SidebarHeading, SidebarItem, SidebarLabel, SidebarSection, SidebarSpacer } from "@/components/catalyst/sidebar";
import { ChevronDownIcon, ChevronUpIcon, UserIcon } from "@heroicons/react/16/solid";
import { webNavConfig } from "@/constants/navigation";
import { useLocation } from "react-router";

const WebNav = () => {
  const location = useLocation();
  return (
    <>
        <Sidebar>
          <SidebarHeader>
            <SidebarHeading>
                <Dropdown>
                    <DropdownButton as={SidebarItem} className="lg:mb-2">
                        <Avatar src={webNavConfig.header.avatarSrc} />
                        <SidebarLabel className="text-xl">{webNavConfig.header.appName}</SidebarLabel>
                        <ChevronDownIcon />
                    </DropdownButton>
                    <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                        {webNavConfig.header.dropdownItems.map((item) => 
                            item.divider ? 
                            <DropdownDivider />
                            :
                            <DropdownItem href={item.href}>
                            {item.icon && <item.icon />}
                            <DropdownLabel>{item.label}</DropdownLabel>
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>
            </SidebarHeading>
          </SidebarHeader>
          <SidebarBody className="scroll">
            <SidebarSection>
              {webNavConfig.body.mainNavItems.map((item) =>
                <SidebarItem href={item.href} current={location.pathname === item.href}>
                    {item.icon && <item.icon />}
                    <SidebarLabel>{item.label}</SidebarLabel>
                </SidebarItem>
              )}  
            </SidebarSection>
            <SidebarSpacer />
            <SidebarSection>
              {webNavConfig.body.lowerNavItems.map((item) => 
                <SidebarItem href={item.href} current={location.pathname === item.href}>
                    {item.icon && <item.icon />}
                    <SidebarLabel>{item.label}</SidebarLabel>
                </SidebarItem>
              )}  
            </SidebarSection>
          </SidebarBody>
          <SidebarFooter className="max-lg:hidden">
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <UserIcon className="h-8"/>
                  <span className="min-w-0">
                    <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">{webNavConfig.footer.userName}</span>
                    <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                      {webNavConfig.footer.userEmail}
                    </span>
                  </span>
                </span>
                <ChevronUpIcon />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="top start">
                {webNavConfig.footer.dropdownItems.map((item) => 
                    item.divider ? 
                    <DropdownDivider />
                    :
                    <DropdownItem href={item.href}>
                    {item.icon && <item.icon />}
                    <DropdownLabel>{item.label}</DropdownLabel>
                    </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
    </>
  );
};

export default WebNav;