import { IconType } from "react-icons";
import { FaHome, FaPlug } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import {
  MdOutlineSmartphone,
  MdFireplace,
  MdConnectedTv,
  MdLibraryMusic,
  MdVideogameAsset,
  MdFastfood,
  MdPhoneIphone,
} from "react-icons/md";
import { PiMoonStarsFill } from "react-icons/pi";

export interface IMenuFeature {
  title?: string;
  service_code?: string;
  service_name?: string;
  service_icon?: string;
  Icon?: IconType;
  theme?: themeTypes;
  href?: string;
}

export type themeTypes =
  | "emerald"
  | "yellow"
  | "slate"
  | "blue"
  | "red"
  | "violet"
  | "pink"
  | "green"
  | "sky"
  | "zinc"
  | "dark-green"
  | "cyan";

export const menuFeaturesData: IMenuFeature[] = [
  {
    Icon: FaHome,
    theme: "emerald",
    title: "PBB",
  },
  {
    Icon: FaPlug,
    theme: "yellow",
    title: "Listrik",
  },
  {
    Icon: MdOutlineSmartphone,
    theme: "slate",
    title: "Pulsa",
  },
  {
    Icon: FaHome,
    theme: "blue",
    title: "PDAM",
  },
  {
    Icon: MdFireplace,
    theme: "red",
    title: "PGN",
  },
  {
    Icon: MdConnectedTv,
    theme: "violet",
    title: "TV Langganan",
  },
  {
    Icon: MdLibraryMusic,
    theme: "pink",
    title: "Musik",
  },
  {
    Icon: MdVideogameAsset,
    theme: "green",
    title: "Game",
  },
  {
    Icon: MdFastfood,
    theme: "sky",
    title: "Voucher Makan",
  },
  {
    Icon: PiMoonStarsFill,
    theme: "zinc",
    title: "Kurban",
  },
  {
    Icon: FaHandsClapping,
    theme: "dark-green",
    title: "Zakat",
  },
  {
    Icon: MdPhoneIphone,
    theme: "cyan",
    title: "Paket Data",
  },
];

interface IBannerData {
  src: string;
  href?: string;
  alt?: string;
}

export const bannerData: IBannerData[] = [
  {
    src: "/assets/images/Banner1.png",
    href: "/",
    alt: "banner1",
  },
  {
    src: "/assets/images/Banner2.png",
    href: "/",
    alt: "banner2",
  },
  {
    src: "/assets/images/Banner3.png",
    href: "/",
    alt: "banner3",
  },
  {
    src: "/assets/images/Banner4.png",
    href: "/",
    alt: "banner4",
  },
  {
    src: "/assets/images/Banner5.png",
    href: "/",
    alt: "banner5",
  },
];
