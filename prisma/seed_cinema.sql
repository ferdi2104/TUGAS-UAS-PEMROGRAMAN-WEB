-- ============================================
-- NEON-ACTION CINEMA - Seed Data
-- Jalankan SETELAH tabel dibuat
-- ============================================

-- Categories
INSERT INTO categories (name, icon, description, color) VALUES
  ('High-Speed', 'directions_car', 'Extreme speed and explosive pursuits', 'primary'),
  ('Samurai-Punk', 'swords', 'Traditional combat meets futuristic tech', 'primary'),
  ('Explosive', 'explosion', 'Massive explosions and destruction', 'tertiary'),
  ('Deep Space', 'rocket_launch', 'Sci-fi adventures beyond Earth', 'secondary'),
  ('Cyber-Mech', 'precision_manufacturing', 'Giant robots and mechanical warfare', 'primary'),
  ('Hacker-Thrill', 'terminal', 'Digital warfare and cyber crimes', 'tertiary')
ON CONFLICT (name) DO NOTHING;

-- Movies
INSERT INTO movies (title, description, year, runtime, rating, genre, subgenre, "imageUrl", tag, featured) VALUES
  (
    'NEON VENDETTA',
    'In the heart of Sector 7, a rogue courier must outrun a corporate death squad through the vertical slums of Neo-Tokyo. High-octane action meets raw synth-wave aesthetics.',
    2024, '124 Mins', 9.2, 'Action', 'Cyberpunk',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBqebPZKNupem9YckkgsWR1t1ke98XXnVtxyscYWxJasM8WPe-fl4owRHV9BHaB7CvL-UrHz0Xzo98hiLu8-lR0D9g4AUw81RTkyPpWwalYiTrIXCrbP0O5RXSeRn9_r958cXJ2joQjZVzdVH1500ytvRX97Zowi8zrygaDRuVOfw2BY5py18TQ-xUZXefm34-yXrtnp5ELGiJDj8UX9EHnpOmT3AMxzitHPRfug9LAiHZHC-cPNvPhsLNbK0Ypn7wyhZKHyopEMNA',
    'Featured', true
  ),
  (
    'CIRCUIT BREAKER',
    'A high-speed car chase through a rain-slicked city at night. Intense orange sparks fly from a clashing metallic impact between two futuristic vehicles.',
    2023, '118 Mins', 8.8, 'Action', 'High-Speed',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD34hdsZ7WlqMt5gi2k57X5JaGfLoCGlbeB2hnOUZPNaQLoAZKzlAFLfpJHF3PHx_3rROHb9KzBCICibYEU0kBQ6rDAjPSJm_fqmdmLNzvrlkPU2DzKrqFgXy6JCR6x2dov1hMXnfEzbC9XpOYOa8azVTofXp53yhIHVbP3ZtzPm5-uQcsnK4ODt1adNUDY5r389AnkAD2SCfhAGtiUqP5Z0xDOW9Lsni0k_RL5OUvyTsWiYUxAXvCLpTf10qKxulPUycg9n8uRrlU',
    'Trending', true
  ),
  (
    'SECTOR SILENCE',
    'A gritty action hero standing on a rooftop overlooking a dense megacity shrouded in darkness. Cinematic lighting casts long shadows while distant neon signs reflect in puddles.',
    2024, '130 Mins', 9.4, 'Sci-Fi', 'Cyberpunk',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAueV56eM9h5b_MnpeCeF9acNCXNtfyffMKZB-0vUr9fSfjNF-tdB7n0qgO1PMyzzdHdw1zgyqs_PGWu-T6AWICLx687I7qsaIoYAtTQ1lGN_dcqxCMDjUGzmbwLzQnIXtwW_AKkTEF0W-b-tmuS8loD_n8PA83dxSYdHIYCAIdnsIu6ObnKu78CnuoXeLNC6oFdcle9NML7GMVgC4QFK-2VsXb0fp5k9fkLjWrPMjpsBEeadPFe91QNJfqGmvT9G5n0xpl5ZjCHtw',
    NULL, false
  ),
  (
    'GLITCH STRIKE',
    'A futuristic martial arts battle scene in a neon-lit dojo. Two fighters captured mid-air in a dynamic, high-contrast composition with vibrant pink and yellow light trails.',
    2024, '108 Mins', 9.1, 'Action', 'Martial Arts',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBk4TYfkmWBxaXPoKkYG_5nL1e-fh6s-3SchTMr7DqN0gnVCanmoXODO_XJjQ1NvMJ3qkAKYGeFcKwZgi5iO6oMux8R4WEhuc0DAzQsoPXPUx8aS_y-ECsr5d6yTViZmK5Xq9kfFG06ffaiazoQb6mTHaBnRhG66Y4nAK6yghaQf6y5WR_1PEZUKUNInr1PK_9AYnN1G2ZbLPulfdQRSgM3QDCnyf98cG7CnZdY2kUIpJNOqEzGgU082F-BFnuypAFxGP7bAarCDKU',
    NULL, false
  ),
  (
    'THE UPLINK',
    'A high-tech control room with multiple holographic screens displaying complex data maps. A female operative in tactical gear analyzes security feeds under deep red emergency light.',
    2024, '115 Mins', 8.9, 'Thriller', 'Hacker-Thrill',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDefz6F5XgZFkzQYY6GedMZz3qBsEE-4MZMEDT-403AH11pcac1mMugQy1Ko-qvG3003Q_eLgaLdte3t9G7YW6r-IMDMITAMWQblNNDhcX533q3ZpCbheQBLa49HpOqiO1uG7NxSikJjiLnVrrlp9A4G3Ruf43VQZtMFIJC-hN6nmKvTuQEX1H1UsZWw1lWeeYVb0opkJRAfwZcYBIOWC8tyK0YVhSsZS1EtKhLEZKoQTUMGH79Y9j52HAo7KfKkkuhkYRdB5QE108',
    NULL, false
  ),
  (
    'VELOCITY PRIME',
    'A futuristic sports arena where competitors play a high-speed game using glowing discs. The arena is filled with a cheering crowd illuminated by massive strobing neon lights.',
    2024, '98 Mins', 8.7, 'Action', 'High-Speed',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCH8QHCHuTyQQ7GE3qNfk-PqjJ4uojN0AfKgZAMmO4W-AiLoodpApAhX9WY2iw3CgLfeShH0xwhkx9xUDUGjnof-lMkKQm9QzhWMvewxOhpa6sYcvkZhZBO4XEOSGansmJSi_9oyjYKOTxZ6EtLcFmezmag5hY5iYLIJCcdY_XXS9noKLTf7vqIgZOzO_TfkedNsC5zif1Gtean-ng_2598SorheAYyMfMgwZSb_cSx_-dHH7WwxZo_QrhQmfTUJngYzTNIeTR9EP0',
    NULL, false
  ),
  (
    'ORBITAL ZERO',
    'An orbital space station with long sleek docking arms set against the backdrop of a vibrant colorful nebula in deep space. A tactical transport vessel approaches a docking bay.',
    2024, '142 Mins', 9.5, 'Sci-Fi', 'Deep Space',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDn2bMS6xiz9ElVmbARrNpB9ixSs7ZDmKAnRSHuQhWv8FcZkcBz0JVcNN0HBK_zrWwUzzcvkUZXbKEN3YDp3UAlCYCdtBNco5Ve8F47WCBXi7RmkM4z8BEMHMBZoGXT8qRnTw2jHtxlOBCJOrdUdE9Ujk8uSi0QwYGFs-Vq3KwmAftS86EiGN6ZhAsyt6vMl0zKyYGFL_kB-fEXHny13ohfac78Q5RQ73xaJvIQlrSo6er8k29uJeqHa5HtI7G0iHKm5LNZusACL_w',
    'Premium', true
  )
ON CONFLICT DO NOTHING;

-- Comments
INSERT INTO comments ("movieId", username, content, likes) 
SELECT id, 'USER_V0ID_99', 'The chase scene at the 45-minute mark is absolutely insane. The sound design really pushes my student perk headphones to the limit!', 42
FROM movies WHERE title = 'NEON VENDETTA'
UNION ALL
SELECT id, 'ACTION_JUNKIE', 'The plot twist near the end caught me off guard. Definitely worth a re-watch to see all the clues hidden in the background screens.', 18
FROM movies WHERE title = 'NEON VENDETTA';
