'use client';

export default function DetailPage() {
  return (
    <main className="pt-16 min-h-screen">
      {/* Hero Video Section */}
      <section className="relative w-full aspect-video md:h-[716px] bg-black overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <button className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm border-2 border-primary flex items-center justify-center text-primary hover:scale-110 transition-transform active:scale-95 group-hover:shadow-[0_0_30px_rgba(255,45,120,0.6)]">
            <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </button>
        </div>
        <div className="w-full h-full bg-surface-dim relative">
          <div className="absolute inset-0 scanline opacity-30"></div>
          <img className="w-full h-full object-cover opacity-60" alt="Movie still" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDVSjG6XFM5Sk7dSEaz8iUWOIL4yHTkgbd0ZCcgMf9TqK6R-hB-Bq7bDH6HjjbSMChqFz9r9mCw9kcJCy5DSTGXlXFNHecH4udIBUrBzXObAXpfmDh6F5zgkXLCeR4VBymA5tSCAxJgirIKSeR6dKhMaca5x47LXmMUEogqzlHHUSqpcuTkhHkPNylmn_hCE-6zYUs8VhbOe4rzJMWoyzbkulRBVi-be7UyJf99e4sMqmRNflTKKLyr3r86up-lmMS4XXDUaHEndE" />
        </div>
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-primary text-on-primary px-3 py-0.5 font-label text-xs font-bold tracking-tighter uppercase">Premium Action</span>
            <span className="bg-surface-container-highest text-secondary border border-secondary/30 px-3 py-0.5 font-label text-xs uppercase tracking-tighter">4K Ultra HD</span>
            <span className="text-tertiary flex items-center gap-1 font-label text-sm"><span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 9.2 Rating</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-headline text-on-surface mb-4 tracking-tighter drop-shadow-2xl">CYBER REVENGE: <span className="text-primary neon-text-pink">VOID</span></h1>
          <div className="flex gap-4">
            <button className="bg-primary hover:bg-primary-container text-on-primary font-label px-8 py-3 font-bold flex items-center gap-2 transition-all neon-glow-pink">
              <span className="material-symbols-outlined">play_circle</span> WATCH NOW
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-on-surface font-label px-8 py-3 font-bold flex items-center gap-2 transition-all">
              <span className="material-symbols-outlined">add</span> MY LIST
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl font-bold font-headline text-secondary mb-4 uppercase tracking-tight flex items-center gap-2">
              <span className="w-8 h-[2px] bg-secondary"></span> Synopsis
            </h2>
            <p className="text-on-surface-variant leading-relaxed text-lg font-body">
              In the year 2099, a disenfranchised tech-prodigy turned mercenary discovers a conspiracy buried deep within the NEON-ACTION megacity&apos;s neural network. Forced into a high-stakes game of survival, she must navigate through high-octane combat zones and illegal street circuits to expose the truth before the &quot;Void Protocol&quot; resets the city&apos;s consciousness. A visceral journey of adrenaline, betrayal, and chrome.
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-surface-container rounded border-l-2 border-primary">
                <span className="block text-xs font-label text-on-surface-variant uppercase mb-1">Director</span>
                <span className="text-on-surface font-semibold">K. Yamamoto</span>
              </div>
              <div className="p-4 bg-surface-container rounded border-l-2 border-secondary">
                <span className="block text-xs font-label text-on-surface-variant uppercase mb-1">Runtime</span>
                <span className="text-on-surface font-semibold">124 Mins</span>
              </div>
              <div className="p-4 bg-surface-container rounded border-l-2 border-tertiary">
                <span className="block text-xs font-label text-on-surface-variant uppercase mb-1">Genre</span>
                <span className="text-on-surface font-semibold">Action / Sci-Fi</span>
              </div>
              <div className="p-4 bg-surface-container rounded border-l-2 border-white">
                <span className="block text-xs font-label text-on-surface-variant uppercase mb-1">Released</span>
                <span className="text-on-surface font-semibold">Dec 2024</span>
              </div>
            </div>
          </section>

          {/* Comments */}
          <section>
            <div className="flex items-center justify-between mb-8 border-b border-outline-variant pb-4">
              <h2 className="text-2xl font-bold font-headline text-primary uppercase tracking-tight">Student Intel</h2>
              <span className="text-on-surface-variant font-label text-sm uppercase">1.4K Comments</span>
            </div>
            <div className="space-y-6">
              <div className="bg-surface-container-high p-4 rounded-xl border border-outline-variant focus-within:border-primary/50 transition-colors">
                <textarea className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 resize-none h-20" placeholder="Upload your tactical review..."></textarea>
                <div className="flex justify-end mt-2">
                  <button className="bg-primary/20 text-primary border border-primary/40 px-6 py-2 font-label text-sm font-bold hover:bg-primary hover:text-on-primary transition-all uppercase tracking-widest">Post Comment</button>
                </div>
              </div>
              <div className="space-y-6">
                {[
                  { user: 'USER_V0ID_99', time: '2 hours ago', text: 'The chase scene at the 45-minute mark is absolutely insane. The sound design really pushes my student perk headphones to the limit!', likes: 42, color: 'secondary' },
                  { user: 'ACTION_JUNKIE', time: '5 hours ago', text: 'The plot twist near the end caught me off guard. Definitely worth a re-watch to see all the clues hidden in the background screens.', likes: 18, color: 'primary' },
                ].map((comment, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`w-12 h-12 rounded-full border border-${comment.color} shrink-0 overflow-hidden bg-surface-variant`}></div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className={`font-label font-bold text-${comment.color}`}>{comment.user}</span>
                        <span className="text-xs text-on-surface-variant uppercase">{comment.time}</span>
                      </div>
                      <p className="text-on-surface-variant text-sm">{comment.text}</p>
                      <div className="flex items-center gap-4 text-on-surface-variant">
                        <button className="flex items-center gap-1 text-xs hover:text-primary transition-colors"><span className="material-symbols-outlined text-sm">thumb_up</span> {comment.likes}</button>
                        <button className="flex items-center gap-1 text-xs hover:text-secondary transition-colors"><span className="material-symbols-outlined text-sm">reply</span> Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <aside className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-headline text-tertiary uppercase tracking-tight">Related Action</h2>
            <a className="text-xs font-label text-on-surface-variant hover:text-secondary uppercase underline underline-offset-4" href="/pencarian">View All</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {[
              { title: 'CIRCUIT BREAKER', year: '2023', runtime: '118 MIN', rating: '8.8', color: 'secondary', tag: 'Trending', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2-r5co6ipr9d1P4f7MJFMD4bQLd2vqtxScTPtlWIADVO0pFO-WD5KdQwPjxqN1jke_36jOrLJzwLpBx7_0ZSBHvwBI_hKMxSTDRmFOD39Mc9FnIGnHiVU6yyk3iFre61kP0UAZT3VJkGqTFB2xEbo2pR51qXsg_EZu1hpNtpaWXvzmU7rbThSvOlgILBckEAzc09GVsxrFVA2K4-ba8QVmIsUNiJy1esl8Dx3KFBZh0eI-n62TygR5EbWtOB0al625Dkz1_PrFIo' },
              { title: 'SOLAR DRIFT', year: '2024', runtime: '105 MIN', rating: '9.0', color: 'primary', tag: 'Must Watch', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDD01NkyGKUDlgIMeDZl0oAJRjWagSxkLByzk8ETu5CINTlUtpu6eZ5y9UIjhRyLbEGq_80LtzXFb2ZbqqvfQesn3y2phz1GOgvB1tsMlBayu9RxcWYm81jGht8aHYFIqlAWNfQ_Z6i3RgsxE-Kc1syFF28YWNMBENHwcDDR6QE9ALXFHI8s9W8oZ7xw-_3v9iqGgBR675uickkie8orCFKgsXsiU4NjWTLj4hGBh3px090TTkz7HTJ3vkYoxZ6zAd_lSMbrUg-to' },
              { title: 'GHOST PROTOCOL', year: '2022', runtime: '130 MIN', rating: '8.5', color: 'tertiary', tag: null, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiw3h2k_5eoCKPzwCZFuSBnVqD1jTgsLQRrtDCbI4qPeaARdk2C1Tm4UBC5SdsU0xvKYTYxpPGLQ6o5GZ0bMuRQeFgSDNyht8NrT1U6Frrxahl_VZJpA1-pllpHBl2JtBj9OJNvBI-QKYA9wBu01_9b4DAwd8w8v8GDVvJGPZ-sLE7jMXvuYrM5VRqarZW26Ecp0hH1BcsbGG73b0P8SSV8tIjxLbThmpZZjmM32Wt30ZSIUm7Vaphpq3xtgErtJA7mpCyXYEXTJE' },
            ].map((movie, i) => (
              <a key={i} href="/detail" className="group relative bg-surface-container rounded overflow-hidden border border-outline-variant hover:border-secondary transition-all cursor-pointer">
                <div className="aspect-video w-full relative">
                  <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={movie.title} src={movie.img} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                  {movie.tag && (
                    <div className="absolute bottom-2 left-2">
                      <span className={`bg-${movie.color} text-on-${movie.color} px-2 py-0.5 text-[10px] font-label font-bold uppercase`}>{movie.tag}</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-headline font-bold text-sm text-on-surface group-hover:text-secondary transition-colors">{movie.title}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-on-surface-variant font-label uppercase">{movie.year} &bull; {movie.runtime}</span>
                    <span className="text-tertiary text-xs font-bold font-label">{movie.rating}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="neon-border-pink p-6 rounded relative overflow-hidden bg-surface-container-highest">
            <div className="relative z-10">
              <span className="text-tertiary font-label text-[10px] uppercase font-bold tracking-[0.2em] block mb-2">Exclusive Student Offer</span>
              <h4 className="text-xl font-headline font-extrabold text-on-surface leading-none mb-4">UNLOCK THE <span className="text-primary">ULTRA-PASS</span></h4>
              <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">Join the global elite. Get access to pre-release screenings, physical action figures, and hidden lore content.</p>
              <button className="w-full py-3 bg-primary/10 border border-primary text-primary font-label font-bold text-sm hover:bg-primary hover:text-on-primary transition-all uppercase tracking-widest">Upgrade Now</button>
            </div>
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/20 blur-[60px] rounded-full"></div>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-8 bg-surface-container-lowest border-t border-secondary/20">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-lg font-black font-headline text-primary">NEON-ACTION</span>
          <p className="text-on-surface-variant font-label text-[10px] tracking-widest">© 2024 NEON-ACTION UNIVERSE. ACCESS GRANTED.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {['Cyber-Action', 'High-Octane', 'Student Forums', 'Global Leaderboard', 'Support', 'Legal'].map((item, i) => (
            <a key={i} className="text-on-surface-variant hover:text-tertiary transition-colors font-label text-xs uppercase tracking-tighter hover:translate-x-1 duration-200" href="#">{item}</a>
          ))}
        </div>
        <div className="flex gap-4">
          <a className="w-10 h-10 flex items-center justify-center border border-outline-variant hover:border-primary hover:text-primary transition-all rounded-full group" href="#">
            <span className="material-symbols-outlined text-lg">public</span>
          </a>
          <a className="w-10 h-10 flex items-center justify-center border border-outline-variant hover:border-secondary hover:text-secondary transition-all rounded-full group" href="#">
            <span className="material-symbols-outlined text-lg">share</span>
          </a>
        </div>
      </footer>
    </main>
  );
}
