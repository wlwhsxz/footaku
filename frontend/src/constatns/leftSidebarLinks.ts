import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HomeIcon from '@mui/icons-material/Home';
import InstagramIcon from '@mui/icons-material/Instagram';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SearchIcon from '@mui/icons-material/Search';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/types';

export interface Nav {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
}  
  route: string;
  label: string;
}


export const leftSidebarLinks: Nav[] = [
  {
    icon: HomeIcon,
    route: "/",
    label: "Home",
  },
  {
    icon: SearchIcon,
    route: "/",
    label: "Search",
  },
  {
    icon: NewspaperIcon,
    route: '/news',
    label: 'news',
  },
  {
    icon: InstagramIcon,
    route: "/instagram",
    label: "Instagram",
  },
  {
    icon: FavoriteBorderIcon,
    route: "me/likes",
    label: "Likes",
  },
];

// export const bottombarLinks = [
//   {
//     icon: "/assets/icons/home.svg",
//     route: "/",
//     label: "Home",
//   },
//   {
//     icon: "/assets/icons/wallpaper.svg",
//     route: "/explore",
//     label: "Explore",
//   },
//   {
//     icon: "/assets/icons/bookmark.svg",
//     route: "/saved",
//     label: "Saved",
//   },
//   {
//     icon: "/assets/icons/gallery-add.svg",
//     route: "/create-post",
//     label: "Create",
//   },
// ];
