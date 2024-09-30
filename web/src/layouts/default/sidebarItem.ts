import {
  IconHome,
  IconSettings,
  IconUsersGroup,
  IconUser,
  IconDashboard,
  IconAddressBook,
  IconHierarchy3,
} from "@tabler/icons-vue"

const sidebarItem = [
  { header: "Home" },
  { title: "Dashboard", to: "/dashboard", icon: IconHome, children: [{ title: "Testing" }, {}] },
]

export const adminSidebarItems = [
  { header: "Administration" },
  { title: "Dashboard", to: "/administration", icon: IconDashboard },
  { title: "Organizations", to: "/administration/organizations", icon: IconHome },
  { title: "Teams", to: "/administration/teams", icon: IconUsersGroup },
  { title: "Positions", to: "/administration/positions", icon: IconHierarchy3 },
  { title: "Users", to: "/administration/users", icon: IconUser },
  { title: "Directory", to: "/administration/directory", icon: IconAddressBook },
  { title: "Settings", to: "/administration/settings", icon: IconSettings },
]

export default sidebarItem
