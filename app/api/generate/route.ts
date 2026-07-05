import { NextRequest, NextResponse } from 'next/server';
import { generateFlashcards, extractTextFromPDF } from '@lib/ai';
import { extractTextFromFile, estimateNumCards } from '@lib/utils';
import { getServiceSupabase } from '@lib/supabase';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'File diperlukan' },
        { status: 400 }
      );
    }

    // Extract text from file server-side
    const buffer = Buffer.from(await file.arrayBuffer());
    let content = '';

    if (file.type === 'application/pdf') {
      content = await extractTextFromPDF(buffer);
    } else {
      content = buffer.toString('utf-8');
    }

    const cleanedContent = extractTextFromFile(content);

    if (cleanedContent.length < 100) {
      return NextResponse.json(
        { error: 'Konten terlalu pendek. Minimal 100 karakter.' },
        { status: 400 }
      );
    }

    const numCards = estimateNumCards(cleanedContent.length);
    const flashcards = await generateFlashcards(cleanedContent, numCards);

    if (!flashcards || flashcards.length === 0) {
      return NextResponse.json(
        { error: 'Gagal generate flashcards' },
        { status: 500 }
      );
    }

    let documentId: string | null = null;
    const supabase = getServiceSupabase();
    if (supabase) {
      const { data: doc, error: docError } = await supabase
        .from('documents')
        .insert({ file_name: file.name, file_size: file.size, content: cleanedContent })
        .select()
        .single();

      if (!docError && doc) {
        documentId = doc.id;
        await supabase.from('flashcards').insert(
          flashcards.map((fc) => ({
            document_id: doc.id,
            question: fc.question,
            answer: fc.answer,
            difficulty: fc.difficulty,
          }))
        );
      }
    }

    return NextResponse.json({
      success: true,
      flashcards,
      count: flashcards.length,
      fileName: file.name,
      documentId,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        error: 'Gagal memproses file',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
