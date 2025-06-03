import { createAsync } from "@solidjs/router"
import { JSXElement, Show } from "solid-js"
import { getUser } from "~/lib/session/session"
import SideBar from "./SideBar"

type LayoutProps = {
    children: JSXElement
    hideSidebar?: boolean
    protected?: boolean
}

export default function Layout(props: LayoutProps) {
    const user = createAsync(() => getUser())
    return <Show when={!props.protected || user() !== null} fallback={<><meta http-equiv="refresh" content="0; url=/login">You need to log in</meta></>}>
        <div class="flex">
        <Show when={!props.hideSidebar}>
            <SideBar />
        </Show>
        <main class="grow">{props.children}</main>
        </div>
    </Show>
}