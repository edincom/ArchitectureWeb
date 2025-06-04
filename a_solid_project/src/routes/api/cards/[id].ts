import type { APIEvent } from '@solidjs/start/server';
import { deleteCards, getCardById } from '~/lib/server';

export async function DELETE(event: APIEvent) {
  const id = event.params.id;

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 });
  }

  try {
    const card = await deleteCards(id);
    return new Response(JSON.stringify({ success: true, card }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Delete error:', err);
    return new Response(JSON.stringify({ error: 'Deletion failed' }), {
      status: 500,
    });
  }
}

export async function GET(event: APIEvent) {
  const id = event.params?.id;
  console.log("[API GET HIT]");
  console.log('[GET CARD] ID param:', id);

  if (!id) {
    return new Response(JSON.stringify({ error: 'Card ID is required' }), {
      status: 400,
    });
  }

  try {
    const card = await getCardById(id);

    if (!card) {
      return new Response(JSON.stringify({ error: 'Card not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ card }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[GET CARD] ERROR:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}