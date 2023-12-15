import {
  CodeIcon,
  ImageIcon,
  MessageSquareIcon,
  MusicIcon,
  VideoIcon,
} from 'lucide-react';

const ServicesLinks = [
  {
    title: 'Conversation',
    href: '/conversation',
    icon: MessageSquareIcon,
    bgColor: 'bg-blue-500/20',
    textColor: 'text-blue-500',
  },
  {
    title: 'Image Generation',
    href: '/image',
    icon: ImageIcon,
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-500',
  },
  {
    title: 'Video Generation',
    href: '/video',
    icon: VideoIcon,
    bgColor: 'bg-yellow-500/20',
    textColor: 'text-yellow-500',
  },
  {
    title: 'Music Generation',
    href: '/music',
    icon: MusicIcon,
    bgColor: 'bg-red-500/20',
    textColor: 'text-red-500',
  },
  {
    title: 'Code Generation',
    href: '/code',
    icon: CodeIcon,
    bgColor: 'bg-purple-500/20',
    textColor: 'text-purple-500',
  },
];

export { ServicesLinks };
