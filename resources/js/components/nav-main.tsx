import { Link, usePage } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';

type NavItem = {
    title: string;
    href?: string;
    icon?: LucideIcon;
    items?: {
        title: string;
        href: string;
    }[];
};

type NavMainProps = {
    items: NavItem[];
};

export default function NavMain({ items }: NavMainProps) {
    const page = usePage();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>

            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => {
                        const hasChildren =
                            item.items && item.items.length > 0;

                        const isChildActive =
                            hasChildren &&
                            item.items?.some(
                                (child) =>
                                    page.url === child.href ||
                                    page.url.startsWith(
                                        `${child.href}/`,
                                    ),
                            );

                        return (
                            <SidebarMenuItem key={item.title}>
                                {hasChildren ? (
                                    <>
                                        <SidebarMenuButton
                                            isActive={isChildActive}
                                        >
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>

                                        <SidebarMenuSub>
                                            {item.items?.map((child) => {
                                                const active =
                                                    page.url === child.href ||
                                                    page.url.startsWith(
                                                        `${child.href}/`,
                                                    );

                                                return (
                                                    <SidebarMenuSubItem
                                                        key={child.title}
                                                    >
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={active}
                                                        >
                                                            <Link
                                                                href={
                                                                    child.href
                                                                }
                                                            >
                                                                <span>
                                                                    {
                                                                        child.title
                                                                    }
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                );
                                            })}
                                        </SidebarMenuSub>
                                    </>
                                ) : (
                                    <SidebarMenuButton
                                        asChild
                                        isActive={
                                            item.href
                                                ? page.url === item.href ||
                                                  page.url.startsWith(
                                                      `${item.href}/`,
                                                  )
                                                : false
                                        }
                                    >
                                        <Link href={item.href ?? '#'}>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                )}
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}