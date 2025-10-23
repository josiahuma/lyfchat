export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] bg-white text-center px-4">
      <h1 className="text-4xl font-extrabold text-lyfOrange mb-4">
        Welcome to Lyfchat
      </h1>
      <p className="text-lg text-gray-700 max-w-md">
        Join communities built around your interests — connect, chat, and grow
        with people who share your passions, not appearances.
      </p>
      <div className="mt-8 space-x-4">
        <a
          href="/register"
          className="bg-lyfOrange text-white px-6 py-2 rounded-full font-medium hover:bg-blue-600"
        >
          Get Started
        </a>
        <a
          href="/login"
          className="border border-lyfOrange text-lyfOrange px-6 py-2 rounded-full font-medium hover:bg-orange-50"
        >
          Login
        </a>
      </div>
    </div>
  );
}
