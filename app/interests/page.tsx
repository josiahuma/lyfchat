'use client';

import InterestCard from '@/components/InterestCard';
import { useRouter } from 'next/navigation';

export default function InterestsPage() {
  const router = useRouter();

  const interests = [
    {
      title: 'Technology & Innovation',
      description: 'Discuss AI, programming, and the latest in tech trends.',
    },
    {
      title: 'Health & Wellness',
      description: 'Share mindfulness tips, routines, and nutrition hacks.',
    },
    {
      title: 'Music & Creativity',
      description: 'Connect with fellow artists, songwriters, and creators.',
    },
    {
      title: 'Entrepreneurship',
      description: 'Learn, share, and grow together as startup founders.',
    },
  ];

  const handleJoin = (title: string) => {
    router.push(`/community?interest=${encodeURIComponent(title)}`);
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Choose Your Interests
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {interests.map((interest) => (
          <InterestCard
            key={interest.title}
            title={interest.title}
            description={interest.description}
            onJoin={() => handleJoin(interest.title)}
          />
        ))}
      </div>
    </div>
  );
}
