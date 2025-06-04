import { useLocation } from "@solidjs/router";

export default function SideBar() {
  const location = useLocation();
  const active = (path: string) =>
    path === location.pathname
      ? "bg-sky-700 text-white"
      : "hover:bg-sky-600 hover:text-white text-sky-100";

  return (
    <nav class="bg-sky-800 h-screen w-64 p-6 rounded-r-2xl shadow-xl flex flex-col">
      <h1 class="text-4xl text-white font-light uppercase mb-12 tracking-wide text-center">STAK</h1>

      <ul class="space-y-4 flex-1">
        <li class={`rounded-lg px-4 py-3 transition-colors ${active("/")}`}>
          <a href="/" class="block text-lg font-medium">🏠 Home</a>
        </li>
        <li class={`rounded-lg px-4 py-3 transition-colors ${active("/search")}`}>
          <a href="/search" class="block text-lg font-medium">🔍 Search</a>
        </li>
        <li class={`rounded-lg px-4 py-3 transition-colors ${active("/profile")}`}>
          <a href="/profile" class="block text-lg font-medium">👤 Profile</a>
        </li>
        <li class={`rounded-lg px-4 py-3 transition-colors ${active("/create")}`}>
          <a href="/create" class="block text-lg font-medium">➕ Create</a>
        </li>
      </ul>
    </nav>
  );
}
