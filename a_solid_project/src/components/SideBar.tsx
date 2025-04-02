import { useLocation } from "@solidjs/router";

export default function SideBar() {
    const location = useLocation();
    const active = (path: string) =>
      path == location.pathname ? "border-sky-600" : "border-transparent hover:border-sky-600";
  
    return (
      <nav class="bg-sky-800 h-screen w-64 p-5 fixed top-0 left-0 rounded-r-2xl shadow-lg">
        <ul class="flex flex-col space-y-4 text-gray-200 pt-10">
          <li class={`border-l-4 ${active("/")} pl-3`}>
            <a href="/">Home</a>
          </li>
          <li class={`border-l-4 ${active("/about")} pl-3`}>
            <a href="/about">About</a>
          </li>
        </ul>
      </nav>
    );
  }