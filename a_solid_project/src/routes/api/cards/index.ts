import type { APIEvent } from '@solidjs/start/server';
import { getCardsUser } from '~/lib/server';

export async function GET(event: APIEvent) {
    const url = new URL(event.request.url);
    const owner = url.searchParams.get("owner");
    if (!owner) {
        return new Response("Missing owner", { status: 400 });
    }

    const card = await getCardsUser(owner);
    return new Response(JSON.stringify(card), {
        headers: { "Content-Type": "application/json" }
    });
}