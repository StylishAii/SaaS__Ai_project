'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { serviceVariants } from '@/components/services/animations';
import { ServicesLinks } from '@/constants';

import { Card, CardTitle } from '@/components/ui/card';
import { MotionDiv } from '@/components/ui/motion-div';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Services = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className='flex flex-col gap-y-4'>
      {ServicesLinks.map(
        ({ title, href, icon: Icon, textColor, bgColor }, index) => (
          <MotionDiv
            key={index}
            variants={serviceVariants}
            custom={index}
            initial={'hidden'}
            animate={'visible'}
          >
            <Link href={href}>
              <Card
                className='flex cursor-pointer flex-row items-center gap-x-4 bg-card
                p-4 transition duration-1000 hover:bg-muted hover:shadow-md'
              >
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-md                     bg-teal-500/20',
                    bgColor,
                  )}
                >
                  <Icon className={`${textColor}`} />
                </div>
                <CardTitle>
                  <h3 className='text-lg'>{title}</h3>
                </CardTitle>
                <div className='ml-auto'>
                  <ArrowRight />
                </div>
              </Card>
            </Link>
          </MotionDiv>
        ),
      )}
    </div>
  );
};

export default Services;
