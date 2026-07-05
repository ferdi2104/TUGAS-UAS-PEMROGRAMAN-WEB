export function calculateNextReviewDate(
  currentDate: Date,
  easinessFactor: number,
  interval: number
): Date {
  let newInterval: number;

  if (interval === 0) {
    newInterval = 1;
  } else if (interval === 1) {
    newInterval = 3;
  } else {
    newInterval = Math.round(interval * easinessFactor);
  }

  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + newInterval);

  return nextDate;
}

export function calculateEasinessFactor(
  quality: number,
  easinessFactor: number
): number {
  let newEF = easinessFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
  return Math.max(1.3, newEF);
}

export interface CardReviewData {
  cardId: string;
  quality: number; // 0-5 (0 = completely forgotten, 5 = perfect response)
  reviewDate: Date;
  easinessFactor: number;
  interval: number;
  repetitions: number;
}

export function updateReviewData(
  current: CardReviewData,
  quality: number
): CardReviewData {
  const newEF = calculateEasinessFactor(quality, current.easinessFactor);
  const newInterval = calculateNextReviewDate(
    new Date(),
    newEF,
    current.interval
  ).getTime() - new Date().getTime();

  return {
    ...current,
    quality,
    reviewDate: new Date(),
    easinessFactor: newEF,
    interval: Math.round(newInterval / (1000 * 60 * 60 * 24)),
    repetitions: current.repetitions + 1,
  };
}
