import { useLocation } from "@solidjs/router";

export default function SideBar() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";

  return (
    <nav class="bg-sky-800 h-screen w-64 p-5 fixed top-0 left-0 rounded-r-2xl shadow-lg">
      <ul class="flex flex-col space-y-10 text-gray-200 pt-10">
        <h1 class="max-6-xs text-4xl text-sky-200 font-thin uppercase my-10">STAK</h1>
        <li class={`border-l-10 ${active("/")} pl-3`}>
          <a href="/" style="font-size: 20px;">Home</a>
        </li>
        <li class={`border-l-10 ${active("/search")} pl-3`}>
          <a href="/search" style="font-size: 20px;">Search</a>
        </li>
        <li class={`border-l-10 ${active("/profile")} pl-3`}>
          <a href="/profile" style="font-size: 20px;">Profile</a>
        </li>
        <li class={`border-l-10 ${active("/create")} pl-3`}>
          <a href="/create" style="font-size: 20px;">Create</a>
        </li>
      </ul>
    </nav>
  );
}