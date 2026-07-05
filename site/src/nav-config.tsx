import { BookOpen, House, SquareUser, Toolbox, Phone } from "lucide-react";
import type { ReactNode } from "react";

export interface NavigationConfig {
  navMain: NavigationConfigItem[];
  getPageConfig(url: string): NavigationConfigItem;
}

export interface NavigationConfigItem {
  title: string;
  url: string;
  icon: ReactNode;
  breadcrumbs: BreadCrumbsItem[];
}

export interface BreadCrumbsItem {
  name: string;
  item: string;
}

const homeBreadCrubm: BreadCrumbsItem = {
  name: "Home",
  item: import.meta.env.VITE_SITE_URL,
};

export const NavigationData: NavigationConfig = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: <House />,
      breadcrumbs: [homeBreadCrubm],
    },
    {
      title: "About",
      url: "/about",
      icon: <SquareUser />,
      breadcrumbs: [
        homeBreadCrubm,
        { name: "About", item: `${import.meta.env.VITE_SITE_URL}/about` },
      ],
    },
    {
      title: "Skills",
      url: "/skills",
      icon: <Toolbox />,
      breadcrumbs: [
        homeBreadCrubm,
        { name: "Skills", item: `${import.meta.env.VITE_SITE_URL}/skills` },
      ],
    },
    {
      title: "Blog",
      url: "/blog",
      icon: <BookOpen />,
      breadcrumbs: [
        homeBreadCrubm,
        { name: "Blog", item: `${import.meta.env.VITE_SITE_URL}/blog` },
      ],
    },
    {
      title: "Contact",
      url: "/contact",
      icon: <Phone />,
      breadcrumbs: [
        homeBreadCrubm,
        { name: "Contact", item: `${import.meta.env.VITE_SITE_URL}/contact` },
      ],
    },
  ],
  getPageConfig(url: string) {
    const matched = this.navMain.find((item) => item.url.includes(url));
    return matched ?? this.navMain[0];
  },
};
