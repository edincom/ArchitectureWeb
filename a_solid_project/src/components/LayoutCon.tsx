import { createAsync } from "@solidjs/router"
import { JSXElement, Show } from "solid-js"
import { getUser } from "~/lib/session/session"

type LayoutProps = {
    children: JSXElement
    protected?: boolean
}

export default function LayoutCon(props: LayoutProps) {
    const user = createAsync(() => getUser());
    return (
      <div class="absolute inset-0 flex justify-center items-center">
        <Show 
          when={props.protected ? user() === null : true}
          fallback={<><meta http-equiv="refresh" content="0; url=/">You are already logged in</meta></>}
        >
          {props.children}
        </Show>
      </div>
    );
  }