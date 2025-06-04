import { getUserInfo, updateUserInfo } from '~/lib/server';
import type { APIEvent } from '@solidjs/start/server';


export async function GET(event: APIEvent) {
    const url = new URL(event.request.url);
    const email = url.searchParams.get("email");
    if (!email) {
        return new Response("Missing email", { status: 400 });
    }

    const user = await getUserInfo(email);
    return new Response(JSON.stringify(user), {
        headers: { "Content-Type": "application/json" }
    });
}

export async function POST(event: APIEvent) {
  try {
    const form = await event.request.formData();

    await updateUserInfo(form);

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Failed to update user info:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}