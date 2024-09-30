import { IconHome, IconCircleDot } from "@tabler/icons-vue"

const horizontalItems = [
  {
    title: "Dashboard",
    icon: IconHome,
    to: "#",
    children: [
      {
        title: "Ignore for now",
        icon: IconCircleDot,
        to: "#awaiting-me",
        exact: true,
      },
    ] /* */,
  },
]

export default horizontalItems
