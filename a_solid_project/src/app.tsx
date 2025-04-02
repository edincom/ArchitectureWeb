import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import SideBar from "~/components/SideBar";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <div class="flex h-screen">
          {/* Sidebar on the left */}
          <SideBar />

          {/* Main content area */}
          <div class="flex flex-col flex-1 ml-64">
            <Suspense>{props.children}</Suspense>
          </div>
        </div>
      )}
    >
      <FileRoutes />
    </Router>
  );
}


