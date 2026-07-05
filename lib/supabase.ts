import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// User Functions
export async function createUser(email: string, name: string) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, name }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUser(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

// Document Functions
export async function uploadDocument(fileName: string, fileSize: number, content: string, userId?: string) {
  const { data, error } = await supabase
    .from('documents')
    .insert([{ file_name: fileName, file_size: fileSize, content, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getDocuments(userId?: string) {
  let query = supabase.from('documents').select('*');

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

// Flashcard Functions
export async function createFlashcards(flashcards: any[], documentId: string) {
  const { data, error } = await supabase
    .from('flashcards')
    .insert(
      flashcards.map(card => ({
        question: card.question,
        answer: card.answer,
        difficulty: card.difficulty || 'medium',
        document_id: documentId,
      }))
    )
    .select();

  if (error) throw error;
  return data;
}

export async function getFlashcards(documentId: string) {
  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('document_id', documentId);

  if (error) throw error;
  return data;
}

// Progress Functions
export async function getUserProgress(userId: string, flashcardId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('flashcard_id', flashcardId)
    .single();

  return { data, error };
}

export async function updateProgress(
  userId: string,
  flashcardId: string,
  isCorrect: boolean
) {
  const { data: existing } = await getUserProgress(userId, flashcardId);

  if (existing) {
    const { data, error } = await supabase
      .from('user_progress')
      .update({
        correct_count: existing.correct_count + (isCorrect ? 1 : 0),
        incorrect_count: existing.incorrect_count + (!isCorrect ? 1 : 0),
        last_reviewed_at: new Date(),
      })
      .eq('user_id', userId)
      .eq('flashcard_id', flashcardId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    const { data, error } = await supabase
      .from('user_progress')
      .insert([
        {
          user_id: userId,
          flashcard_id: flashcardId,
          correct_count: isCorrect ? 1 : 0,
          incorrect_count: !isCorrect ? 1 : 0,
          last_reviewed_at: new Date(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export async function getUserStats(userId: string) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId);

  if (error) throw error;

  const total = data.length;
  const learned = data.filter(item => item.is_learned).length;
  const learning = data.filter(item => !item.is_learned && (item.correct_count > 0 || item.incorrect_count > 0)).length;

  return {
    total,
    learned,
    learning,
    notStarted: total - learned - learning,
  };
}

// Review History Functions
export async function addReviewRecord(
  userId: string,
  flashcardId: string,
  quality: number,
  easinessFactor: number,
  interval: number,
  repetitions: number
) {
  const { data, error } = await supabase
    .from('review_history')
    .insert([
      {
        user_id: userId,
        flashcard_id: flashcardId,
        quality,
        easiness_factor: easinessFactor,
        interval,
        repetitions,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}
