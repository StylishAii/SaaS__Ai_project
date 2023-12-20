import {
  CodeIcon,
  ImageIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  MusicIcon,
  SettingsIcon,
  VideoIcon,
} from 'lucide-react';

export const links = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboardIcon,
    textColor: 'text-red-500',
  },
  {
    title: 'Conversation',
    href: '/conversation',
    icon: MessageSquareIcon,
    textColor: 'text-orange-500',
  },
  {
    title: 'Image Generation',
    href: '/image',
    icon: ImageIcon,
    textColor: 'text-yellow-500',
  },
  {
    title: 'Video Generation',
    href: '/video',
    icon: VideoIcon,
    textColor: 'text-green-500',
  },
  {
    title: 'Music Generation',
    href: '/music',
    icon: MusicIcon,
    textColor: 'text-blue-500',
  },
  {
    title: 'Code Generation',
    href: '/code',
    icon: CodeIcon,
    textColor: 'text-indigo-500',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: SettingsIcon,
    textColor: 'text-purple-500',
  },
];

