import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import {
  RiMessage2Line,
  RiMessage2Fill,
  RiBookmarkFill,
  RiBookmarkLine,
  RiAccountCircleLine,
  RiAccountCircleFill,
} from "react-icons/ri";

const menuItem = [
  { icon: <AiOutlineHome />, iconActive: <AiFillHome />, name: "Home" },
  {
    icon: <RiBookmarkLine />,
    iconActive: <RiBookmarkFill />,
    name: "Bookmarks",
  },
  {
    icon: <RiMessage2Line />,
    iconActive: <RiMessage2Fill />,
    name: "Messages",
  },
  {
    icon: <RiAccountCircleLine />,
    iconActive: <RiAccountCircleFill />,
    name: "Profile",
  },
];
export default menuItem;
