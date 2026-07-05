export function calculateNextInterval(
  currentInterval: number,
  easinessFactor: number
): number {
  if (currentInterval === 0) {
    return 1;
  } else if (currentInterval === 1) {
    return 3;
  }
  return Math.round(currentInterval * easinessFactor);
}

export function calculateNextReviewDate(
  currentDate: Date,
  interval: number
): Date {
  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + interval);
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
  quality: number;
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
  const newInterval = calculateNextInterval(current.interval, newEF);

  return {
    ...current,
    quality,
    reviewDate: new Date(),
    easinessFactor: newEF,
    interval: newInterval,
    repetitions: current.repetitions + 1,
  };
}
