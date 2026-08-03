import { supabase } from '../../../lib/supabaseClient';

export async function POST(req) {
  const body = await req.json();
  const { name, lastName, mailUNET, role } = body;

  const { data, error } = await supabase
    .from('User')
    .insert([{ name, lastName, mailUNET, role }]);

  if (error) return new Response(JSON.stringify({ error }), { status: 400 });
  return new Response(JSON.stringify(data), { status: 201 });
}

export async function GET() {
  const { data, error } = await supabase.from('User').select('*');
  if (error) return new Response(JSON.stringify({ error }), { status: 400 });
  return new Response(JSON.stringify(data), { status: 200 });
}
