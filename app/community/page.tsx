import { Suspense } from 'react';
import CommunityPageContent from './CommunityPageContent';

export default function CommunityPage() {
  return (
    <Suspense fallback={<div className="text-center py-10 text-gray-500">Loading community feed...</div>}>
      <CommunityPageContent />
    </Suspense>
  );
}
