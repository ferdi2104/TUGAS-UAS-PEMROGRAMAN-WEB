-- ============================================
-- 1. Tambah kolom videoUrl (jika belum ada)
-- ============================================
ALTER TABLE movies ADD COLUMN IF NOT EXISTS "videoUrl" TEXT;

-- ============================================
-- 2. Hapus data lama
-- ============================================
DELETE FROM comments;
DELETE FROM movies;

-- ============================================
-- 3. Reset auto-increment (reset sequence)
-- ============================================
-- Note: UUID tidak pakai sequence, jadi skip

-- ============================================
-- 4. Insert film asli dengan link YouTube
-- ============================================
INSERT INTO movies (title, description, year, runtime, rating, genre, subgenre, "imageUrl", "videoUrl", tag, featured) VALUES
('Jackie Chan: International Justice', 'Jackie Chan and a female assassin team up to take down international crime syndicates in this action-packed blockbuster.', 2024, '120 Mins', 8.5, 'Action', 'Martial Arts', 'https://img.youtube.com/vi/xghsjPvOjZA/maxresdefault.jpg', 'https://www.youtube.com/watch?v=xghsjPvOjZA', 'Featured', true),
('Silent Zone', 'A terrifying zombie horror film that plunges you into a world of silence and survival. Every sound could be your last.', 2024, '110 Mins', 7.8, 'Horror', 'Zombie', 'https://img.youtube.com/vi/xnSXtIqSW3c/maxresdefault.jpg', 'https://www.youtube.com/watch?v=xnSXtIqSW3c', 'Trending', true),
('Kemah Terlarang', 'Kesurupan massal terjadi di sebuah perkemahan terpencil. Misteri dan teror menghantui setiap sudut malam.', 2024, '105 Mins', 7.5, 'Horror', 'Supernatural', 'https://img.youtube.com/vi/3yEBh1CFCDw/maxresdefault.jpg', 'https://www.youtube.com/watch?v=3yEBh1CFCDw', 'Trending', true),
('Donnie Yen: Brutal Revenge', 'A bone-chilling one-man war for justice. Donnie Yen unleashes brutal revenge after his father is wronged.', 2024, '118 Mins', 8.7, 'Action', 'Martial Arts', 'https://img.youtube.com/vi/SE-AhAm_EBk/maxresdefault.jpg', 'https://www.youtube.com/watch?v=SE-AhAm_EBk', 'Featured', true),
('Shadow Swordsman', 'A lone wolf escort must protect the most wanted fugitive. All enemies fall before the shadow swordsman.', 2024, '115 Mins', 8.2, 'Action', 'Martial Arts', 'https://img.youtube.com/vi/cSIsQSnteX4/maxresdefault.jpg', 'https://www.youtube.com/watch?v=cSIsQSnteX4', 'Trending', false),
('Bank Heist: Secret Agent', 'An unassuming security guard turns out to be the most powerful secret agent. Caught in a bank explosion time loop, he must save everyone.', 2024, '125 Mins', 8.0, 'Action', 'Thriller', 'https://img.youtube.com/vi/jcAF3yDTVYs/maxresdefault.jpg', 'https://www.youtube.com/watch?v=jcAF3yDTVYs', 'Premium', false),
('Drug Lord Undercover', 'A drug lord escapes prison, unaware his partner is an undercover soldier. Deep inside the drug den, justice will be served.', 2024, '112 Mins', 8.3, 'Action', 'Crime', 'https://img.youtube.com/vi/JDcl3UtX9fQ/maxresdefault.jpg', 'https://www.youtube.com/watch?v=JDcl3UtX9fQ', 'Trending', true),
('Fast & Furious: Full Throttle', 'The best races from the Fast & Furious saga compiled into one full-throttle adrenaline experience.', 2024, '130 Mins', 9.0, 'Action', 'High-Speed', 'https://img.youtube.com/vi/nkCXmkCmjzA/maxresdefault.jpg', 'https://www.youtube.com/watch?v=nkCXmkCmjzA', 'Premium', true),
('Born to Race', 'A high-octane action film about street racing, fast cars, and the ultimate need for speed. 4K full movie.', 2024, '108 Mins', 8.1, 'Action', 'High-Speed', 'https://img.youtube.com/vi/_xPzrsv_Dp4/maxresdefault.jpg', 'https://www.youtube.com/watch?v=_xPzrsv_Dp4', 'Trending', false),
('Redline', 'Fear nothing. Risk everything. Redline is a 2007 action film directed by Andy Cheng, featuring high-speed car chases and intense drama.', 2024, '95 Mins', 7.9, 'Action', 'High-Speed', 'https://img.youtube.com/vi/GjD9mDlL3MU/maxresdefault.jpg', 'https://www.youtube.com/watch?v=GjD9mDlL3MU', NULL, false);

-- ============================================
-- 5. Comments (contoh)
-- ============================================
INSERT INTO comments ("movieId", username, content, likes)
SELECT id, 'ACTION_FAN', 'Jackie never gets old! This movie is pure gold.', 56
FROM movies WHERE title = 'Jackie Chan: International Justice';

INSERT INTO comments ("movieId", username, content, likes)
SELECT id, 'HORROR_LOVER', 'Silent Zone is genuinely terrifying. The sound design is incredible.', 34
FROM movies WHERE title = 'Silent Zone';

INSERT INTO comments ("movieId", username, content, likes)
SELECT id, 'DONNIE_FAN', 'Donnie Yen at his finest. The fight choreography is next level.', 78
FROM movies WHERE title = 'Donnie Yen: Brutal Revenge';
