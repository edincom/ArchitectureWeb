import type { APIEvent } from '@solidjs/start/server';
import { register } from '~/lib/session/registration';

export async function POST(event: APIEvent) {
  console.log("POST /api/register");

  try {
    const formData = await event.request.formData();
    const result = await register(formData); 
    console.log("result", result);

    return new Response(JSON.stringify(result), {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erreur lors de l'inscription" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}
