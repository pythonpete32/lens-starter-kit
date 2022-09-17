import Flare from '../assets/Flare.png';

import React, { FC, ReactNode } from 'react';
import { Navbar } from '../components/Navbar';

interface Props {
  cover: string;
}

const profile: FC<Props> = ({ cover }) => {
  return (
    <>
      <Navbar />
      <div
        className="h-52 sm:h-80 bg-gradient-to-r from-purple-500 to-pink-500"
      // style={{
      //   backgroundImage: Flare,
      //   backgroundColor: '#8b5cf6',
      //   backgroundSize: cover ? 'cover' : '30%',
      //   backgroundPosition: 'center center',
      //   backgroundRepeat: cover ? 'no-repeat' : 'repeat'
      // }}
      />
      <GridLayout className="pt-6">
        <GridItemFour>
          <div className="px-5 mb-4 space-y-5 sm:px-0">
            <div className="relative -mt-24 w-32 h-32 sm:-mt-32 sm:w-52 sm:h-52">
              <img
                src={'https://avatars.dicebear.com/api/adventurer/mejsjdirbfldspafdfnr.svg'}
                className="w-32 h-32 bg-gray-200 rounded-xl ring-8 ring-gray-50 sm:w-52 sm:h-52 dark:bg-gray-700 dark:ring-black"
                height={128}
                width={128}
                alt={profile?.handle}
              />
            </div>
          </div>
        </GridItemFour>
      </GridLayout>
    </>
  );
};

export default profile;

// `url(${`'https://assets.lenster.xyz/images/patterns/2.svg`})`,

interface Props {
  children: ReactNode;
  className?: string;
}

export const GridLayout: FC<Props> = ({ children, className = '' }) => {
  return (
    <div className={`container mx-auto max-w-screen-xl flex-grow py-8 px-0 sm:px-5 ${className}`}>
      <div className="grid grid-cols-12 lg:gap-8">{children}</div>
    </div>
  );
};

export const GridItemFour: FC<Props> = ({ children, className = '' }) => {
  return <div className={`lg:col-span-4 md:col-span-12 col-span-12 ${className}`}>{children}</div>;
};

export const GridItemSix: FC<Props> = ({ children, className = '' }) => {
  return <div className={`lg:col-span-6 md:col-span-12 col-span-12 ${className}`}>{children}</div>;
};

export const GridItemEight: FC<Props> = ({ children, className = '' }) => {
  return <div className={`lg:col-span-8 md:col-span-12 col-span-12 mb-5 ${className}`}>{children}</div>;
};

export const GridItemTwelve: FC<Props> = ({ children, className = '' }) => {
  return <div className={`col-span-12 ${className}`}>{children}</div>;
};