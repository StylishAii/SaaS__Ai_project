'use client';

import {
  ArrowRight,
  CodeIcon,
  ImageIcon,
  MessageSquareIcon,
  MusicIcon,
  VideoIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { MotionDiv } from '@/components/ui/MotionDiv';
import { Card, CardTitle } from '@/components/ui/card';

const ServicesLinks = [
  { title: 'Conversation', href: '/conversation', icon: MessageSquareIcon },
  { title: 'Image Generation', href: '/image', icon: ImageIcon },
  { title: 'Video Generation', href: '/video', icon: VideoIcon },
  { title: 'Music Generation', href: '/music', icon: MusicIcon },
  { title: 'Code Generation', href: '/code', icon: CodeIcon },
];

const Services = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className='flex flex-col gap-y-4'>
      {ServicesLinks.map(({ title, href, icon: Icon }, index) => (
        <MotionDiv
          key={index}
          custom={index}
          initial={'initial'}
          animate={'enter'}
          exit={'exit'}
        >
          <Card
            className='flex flex-row items-center p-4 gap-x-4 bg-card 
            cursor-pointer'
          >
            <div
              className='h-10 w-10 bg-teal-500/20 flex items-center 
              justify-center rounded-md'
            >
              <Icon className='text-teal-500' />
            </div>
            <CardTitle>
              <h3 className='text-lg'>{title}</h3>
            </CardTitle>
            <div className='ml-auto'>
              <ArrowRight />
            </div>
          </Card>
        </MotionDiv>
      ))}
    </div>
  );
};

export default Services;
