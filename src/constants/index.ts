import {
  CodeIcon,
  ImageIcon,
  MessageSquareIcon,
  MusicIcon,
  SettingsIcon,
  VideoIcon,
} from 'lucide-react';

const LandingPrompts = [
  {
    title: 'Write a thank-you note',
    questions: ['to my interviewer', 'to my babysitter'],
  },
  {
    title: 'Create a grocery list',
    questions: ['for a dinner party', 'for a week of meals'],
  },
  {
    title: 'Design a logo',
    questions: ['for a tech startup', 'for a fitness brand'],
  },
  {
    title: 'Plan a vacation',
    questions: ['to a tropical destination', 'to a historical city'],
  },
  {
    title: 'Bake a cake',
    questions: ['for a birthday celebration', 'for a special occasion'],
  },
];

const Conversation = {
  title: 'Conversation',
  href: '/conversation',
  icon: MessageSquareIcon,
  bgColor: 'bg-orange-500/20',
  textColor: 'text-orange-500',
};

const ImageGeneration = {
  title: 'Image Generation',
  href: '/image',
  icon: ImageIcon,
  bgColor: 'bg-yellow-500/20',
  textColor: 'text-yellow-500',
};

const VideoGeneration = {
  title: 'Video Generation',
  href: '/video',
  icon: VideoIcon,
  bgColor: 'bg-green-500/20',
  textColor: 'text-green-500',
};

const MusicGeneration = {
  title: 'Music Generation',
  href: '/music',
  icon: MusicIcon,
  bgColor: 'bg-blue-500/20',
  textColor: 'text-blue-500',
};

const CodeGeneration = {
  title: 'Code Generation',
  href: '/code',
  icon: CodeIcon,
  bgColor: 'bg-indigo-500/20',
  textColor: 'text-indigo-500',
};

const Settings = {
  title: 'Settings',
  href: '/settings',
  icon: SettingsIcon,
  bgColor: 'bg-purple-500/20',
  textColor: 'text-purple-500',
};

const ServicesLinks = [
  Conversation,
  ImageGeneration,
  VideoGeneration,
  MusicGeneration,
  CodeGeneration,
];

export {
  CodeGeneration,
  Conversation,
  ImageGeneration,
  LandingPrompts,
  MusicGeneration,
  ServicesLinks,
  Settings,
  VideoGeneration,
};
