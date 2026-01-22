import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Server-side Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookId, chapterTitle, formTitle, responses } = body;

    if (!bookId || !responses) {
      return NextResponse.json(
        { error: 'Missing required fields: bookId and responses are required' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert the form response - stores all fields as a JSON object
    // Note: We don't use .select() because RLS only allows INSERT, not SELECT
    const { error } = await supabase
      .from('form_responses')
      .insert({
        book_id: bookId,
        chapter_title: chapterTitle || null,
        form_title: formTitle || null,
        responses: responses, // JSON object with all field responses
        submitted_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save form response', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Form response saved successfully'
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
