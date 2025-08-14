import { IMenuFeature, themeTypes } from "@/constants/data";
import Image from "next/image";
import Link from "next/link";

export default function MenuFeature({
  theme = "emerald",
  service_code,
  service_icon,
  service_name,
}: IMenuFeature) {
  const color = getThemeMenuFeature(theme);
  return (
    <Link
      href={"/topup/" + service_code?.toLowerCase()}
      className="flex max-w-16 flex-col gap-3 justify-center items-center"
    >
      <div
        className={`w-16 h-16 ${color.background} rounded flex justify-center items-center`}
      >
        {service_icon && (
          <Image
            src={service_icon}
            width={64}
            height={64}
            className="object-contain"
            alt={service_name || ""}
          />
        )}
      </div>
      <span className="text-sm text-center">{service_code}</span>
    </Link>
  );
}

export const MenuFeatureLoader = () => {
  return (
    <div className="w-16 h-16 min-w-16 bg-gray-200 animate-pulse rounded-xl"></div>
  );
};

function getThemeMenuFeature(theme: themeTypes) {
  let result = {
    color: "",
    background: "",
  };

  switch (theme) {
    case "emerald":
      result.color = "text-emerald-500";
      result.background = "bg-emerald-100";
      break;
    case "yellow":
      result.color = "text-yellow-500";
      result.background = "bg-yellow-100";
      break;
    case "slate":
      result.color = "text-slate-500";
      result.background = "bg-slate-100";
      break;
    case "blue":
      result.color = "text-blue-500";
      result.background = "bg-blue-100";
      break;
    case "red":
      result.color = "text-red-500";
      result.background = "bg-red-100";
      break;
    case "violet":
      result.color = "text-violet-500";
      result.background = "bg-violet-100";
      break;
    case "pink":
      result.color = "text-pink-500";
      result.background = "bg-pink-100";
      break;
    case "green":
      result.color = "text-green-500";
      result.background = "bg-green-100";
      break;
    case "sky":
      result.color = "text-sky-500";
      result.background = "bg-sky-100";
      break;
    case "zinc":
      result.color = "text-zinc-500";
      result.background = "bg-zinc-100";
      break;
    case "dark-green":
      result.color = "text-green-900";
      result.background = "bg-green-100";
      break;
    case "cyan":
      result.color = "text-cyan-500";
      result.background = "bg-cyan-100";
      break;

    default:
      break;
  }
  return result;
}
