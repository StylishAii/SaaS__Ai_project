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
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboardIcon },
  { title: 'Conversation', href: '/conversation', icon: MessageSquareIcon },
  { title: 'Image Generation', href: '/image', icon: ImageIcon },
  { title: 'Video Generation', href: '/video', icon: VideoIcon },
  { title: 'Music Generation', href: '/music', icon: MusicIcon },
  { title: 'Code Generation', href: '/code', icon: CodeIcon },
  { title: 'Settings', href: '/settings', icon: SettingsIcon },
];
