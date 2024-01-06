import { BookCheck, BookmarkIcon, GroupIcon, Home, LucideGalleryHorizontalEnd, LucideWallpaper, PenBox, PenSquare, Podcast, Save, Wallet, Wallpaper, WallpaperIcon } from "lucide-react"



export const sidebarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    icon: Home,
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    icon: WallpaperIcon,
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: "/assets/icons/people.svg",
    icon: GroupIcon,
    route: "/all-users",
    label: "People",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    icon: BookmarkIcon,
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    icon: LucideGalleryHorizontalEnd,
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    imgURL: "/assets/icons/home.svg",
    icon: Home,
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/wallpaper.svg",
    icon: WallpaperIcon,
    route: "/explore",
    label: "Explore",
  },
  {
    imgURL: "/assets/icons/bookmark.svg",
    icon: BookCheck,
    route: "/saved",
    label: "Saved",
  },
  {
    imgURL: "/assets/icons/gallery-add.svg",
    icon: PenSquare,
    route: "/create-post",
    label: "Create",
  },
];
