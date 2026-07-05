import { NextRequest, NextResponse } from 'next/server';
import { generateFlashcards, extractTextFromPDF } from '@lib/ai';
import { extractTextFromFile } from '@lib/utils';

export const runtime = 'nodejs';
export const maxDuration = 30;

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

    const flashcards = await generateFlashcards(cleanedContent, 10);

    if (!flashcards || flashcards.length === 0) {
      return NextResponse.json(
        { error: 'Gagal generate flashcards' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      flashcards,
      count: flashcards.length,
      fileName: file.name,
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
