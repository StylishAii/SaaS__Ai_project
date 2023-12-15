'use client';

import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { serviceVariants } from '@/components/services/animation';
import { ServicesLinks } from '@/components/services/data';

import { MotionDiv } from '@/components/ui/MotionDiv';
import { Card, CardTitle } from '@/components/ui/card';
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
                className='flex flex-row items-center p-4 gap-x-4 bg-card group
              cursor-pointer hover:shadow-md transition duration-300 hover:bg-muted'
              >
                <div
                  className={cn(
                    'h-10 w-10 bg-teal-500/20 flex items-center justify-center \
                    rounded-md group-hover:opacity-75',
                    bgColor,
                  )}
                >
                  <Icon
                    className={`${textColor} group-hover:text-opacity-75`}
                  />
                </div>
                <CardTitle>
                  <h3 className='text-lg group-hover:text-black/75'>{title}</h3>
                </CardTitle>
                <div className='ml-auto group-hover:text-black/75'>
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
