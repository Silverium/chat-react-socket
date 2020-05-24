export interface AppTabProps {
  href: string;
  name: string;
}

export const appTabs: AppTabProps[] = [
  {
    href: '#chats',
    name: 'chat'
  },
  {
    href: '#settings',
    name: 'settings'
  }
]
