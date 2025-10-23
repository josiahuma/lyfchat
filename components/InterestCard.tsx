'use client';

type InterestCardProps = {
  title: string;
  description: string;
  onJoin?: () => void;
};

export default function InterestCard({ title, description, onJoin }: InterestCardProps) {
  return (
    <div className="flex flex-col justify-between p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 hover:border-blue-300">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2 text-sm leading-relaxed">{description}</p>
      </div>
      <button
        onClick={onJoin}
        className="mt-4 rounded-full bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Join
      </button>
    </div>
  );
}
