import { ChefHat, Globe, PartyPopper } from "lucide-react";
import { ReactNode } from "react";

interface AppProps {
  id: number;
  name: string;
  title: string;
  image: ReactNode;
}

export const categoryItems: AppProps[] = [
  {
    id: 0,
    name: "template",
    title: "Template",
    image: <Globe />,
  },
  {
    id: 1,
    name: "uikit",
    title: "UI Kit",
    image: <ChefHat />,
  },
  {
    id: 3,
    name: "icon",
    title: "Icon",
    image: <PartyPopper />,
  },
];
