import { NextRequest, NextResponse } from 'next/server';
import { generateFlashcards } from '@lib/ai';
import { extractTextFromFile } from '@lib/utils';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const content = formData.get('content') as string;

    if (!file || !content) {
      return NextResponse.json(
        { error: 'File dan content diperlukan' },
        { status: 400 }
      );
    }

    // Extract dan bersihkan text
    const cleanedContent = extractTextFromFile(content);

    if (cleanedContent.length < 100) {
      return NextResponse.json(
        { error: 'Konten terlalu pendek. Minimal 100 karakter.' },
        { status: 400 }
      );
    }

    // Generate flashcards menggunakan AI
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
