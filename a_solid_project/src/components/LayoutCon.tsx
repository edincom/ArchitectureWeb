import { createAsync } from "@solidjs/router"
import { JSXElement, Show } from "solid-js"
import { getUser } from "~/session/session"

type LayoutProps = {
    children: JSXElement
    protected?: boolean
}

export default function LayoutCon(props: LayoutProps) {
    const user = createAsync(() => getUser())
    return <Show when={!props.protected || user() == null} fallback={<><meta http-equiv="refresh" content="0; url=/">You are already logged in</meta></>}>
        <main>{props.children}</main>
    </Show>
}