import React from 'react'
import TabLayout from '../layouts/TabLayout'
export const InviteTabs = [
    {
      name: "Invite Others",
    //   icon: "history.svg",
    //   selectedIcon: "on.history.svg",
      id: 1,
      isClicked: true,
    },
    {
      name: "Call Others",
    //   icon: "star.svg",
    //   selectedIcon: "on.star.svg",
      id: 2,
      isClicked: false,
    },
  ];

function InviteUsers() {
  return (
    <TabLayout showTitle={false} data={InviteTabs} />
  )
}

export default InviteUsers