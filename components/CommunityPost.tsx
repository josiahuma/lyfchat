type PostProps = {
  user: string;
  text: string;
  interest: string;
};

export default function CommunityPost({ user, text, interest }: PostProps) {
  return (
    <div className="border border-gray-100 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-800">{user}</h3>
        <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
          {interest}
        </span>
      </div>
      <p className="text-gray-700 text-sm">{text}</p>
    </div>
  );
}
