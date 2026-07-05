import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
);

export interface GeneratedFlashcard {
  id: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const MODEL_NAME = 'gemini-1.5-pro';

export async function generateFlashcards(
  content: string,
  numCards: number = 10
): Promise<GeneratedFlashcard[]> {
  try {
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    });

    const prompt = `Anda adalah asisten pembuat flashcard. Buat ${numCards} flashcard untuk belajar dari konten berikut.

Aturan:
- Setiap flashcard memiliki pertanyaan spesifik dan jawaban ringkas
- Variasikan tingkat kesulitan (easy, medium, hard)
- Fokus pada konsep kunci, definisi, dan hubungan antar konsep

Format JSON:
{
  "flashcards": [
    { "question": "...", "answer": "...", "difficulty": "easy|medium|hard" }
  ]
}

Konten:
${content}

HANYA kirim JSON, tanpa teks lain.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      const clean = text.replace(/```json|```/g, '').trim();
      const fallback = clean.match(/\{[\s\S]*\}/);
      if (!fallback) throw new Error('Invalid response format');
    }

    const parsedData = JSON.parse(jsonMatch ? jsonMatch[0] : text.replace(/```json|```/g, '').trim());

    const flashcards: GeneratedFlashcard[] = (parsedData.flashcards || []).map(
      (card: Omit<GeneratedFlashcard, 'id'>, index: number) => ({
        id: `fc-${Date.now()}-${index}`,
        question: card.question || 'Pertanyaan tidak tersedia',
        answer: card.answer || 'Jawaban tidak tersedia',
        difficulty: card.difficulty || 'medium',
      })
    );

    if (flashcards.length === 0) {
      throw new Error('AI tidak menghasilkan flashcard');
    }

    return flashcards;
  } catch (error) {
    console.error('Error generating flashcards:', error);
    throw error;
  }
}

export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  try {
    const pdfjsLib = await import('pdfjs-dist');
    const uint8Array = new Uint8Array(buffer);
    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;
    const pages: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const text = content.items
        .map((item: any) => item.str)
        .join(' ');
      pages.push(text);
    }

    return pages.join('\n').trim();
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    return buffer.toString('utf-8').replace(/[^\x20-\x7E\n]/g, ' ').trim();
  }
}
