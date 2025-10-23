'use client';

import CommunityPost from '@/components/CommunityPost';
import { useSearchParams } from 'next/navigation';

export default function CommunityPage() {
  const params = useSearchParams();
  const interest = params.get('interest') || 'All';

  const posts = [
    { id: 1, user: 'Alex', text: 'What are your thoughts on the latest AI tools?', interest: 'Technology & Innovation' },
    { id: 2, user: 'Sam', text: 'Best way to stay motivated during workouts?', interest: 'Health & Wellness' },
    { id: 3, user: 'Mia', text: 'Anyone producing music with open-source tools?', interest: 'Music & Creativity' },
  ];

  const filteredPosts =
    interest === 'All' ? posts : posts.filter((p) => p.interest === interest);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {interest === 'All' ? 'Community Feed' : `${interest} Community`}
      </h1>
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <CommunityPost key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
