'use client';

export default function KategoriPage() {
  return (
    <main className="pt-24 pb-20 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-20"></div>

      <section className="container mx-auto px-6 relative z-10 mb-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-on-surface tracking-tighter leading-none mb-4">
            CHOOSE YOUR <span className="text-primary neon-text-pink">BATTLEGROUND</span>
          </h1>
          <p className="text-on-surface-variant font-body text-lg leading-relaxed max-w-xl">
            From the rain-slicked streets of a dystopian future to the precision of a high-stakes heist. Filter the universe by your preferred adrenaline profile.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* High-Octane */}
          <div className="md:col-span-2 md:row-span-2 category-card group cursor-pointer relative overflow-hidden rounded-xl h-[400px] md:h-auto">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7j1ZSl33I8czO3bDqxDz6ZExv6LarsLUP3I-kQ69Q_F6APPcmiKDh-hj3P4uB5EEQ2z1JxnoycZHJbMp6v_NRYORvXofshC4tJ1VEOYvG8FhvLUfimrAGEBukOb8DybixRrjUf501MO_u88pUUL5OmN22k1-rnwGRYF6_GuOkIDzbR4HdOuVe-bikY_-kWM711Xxa7z6urkNenp0KRi67eDg1Eag9RZRNtZwInIIuFzwPSnbFS-8BnNDKNR6wOs843tPyJIfl9Dc')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90"></div>
            <div className="absolute inset-0 border border-primary/30 rounded-xl transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_16px_rgba(255,45,120,0.4)]"></div>
            <div className="absolute bottom-0 p-8 w-full">
              <div className="flex justify-between items-end">
                <div>
                  <span className="font-label text-primary text-xs font-bold uppercase tracking-[0.2em] block mb-2">Primary Core</span>
                  <h3 className="text-4xl font-headline font-bold text-on-surface tracking-tight mb-2">High-Octane</h3>
                  <p className="text-on-surface-variant max-w-sm">Extreme speed, explosive pursuits, and relentless momentum across urban landscapes.</p>
                </div>
                <span className="material-symbols-outlined text-secondary text-4xl group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
              </div>
            </div>
          </div>

          {/* Martial Arts */}
          <div className="category-card group cursor-pointer relative overflow-hidden rounded-xl h-[300px]">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEUQZaiNuac_p3nejwW53InYTTT7COSBU-m3SQ_di6g_XdNrptHq3mpShdVGJv5vZtQt13WosLRkqlRlRi2tX9SqEfhgse_-4fPuNWxyC8P0HnMOo-yaaG3BMUKJXZxvvX0lekRRDWdLqWpoB_iU5-O2sxaemj7jKBBlMnOMLNIxoe8hfVbWv3pMz8-x7QoSvFVlV6CR0EmGJfyqxbl6ecw0AJLxkqlydmLNN4khpqrAYXv7eTzr9bMtJgg3CJ-x7QV0MM0y3_Kq8')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
            <div className="absolute inset-0 border border-secondary/30 rounded-xl transition-all duration-300 group-hover:border-secondary group-hover:shadow-[0_0_16px_rgba(0,255,204,0.4)]"></div>
            <div className="absolute bottom-0 p-6 w-full">
              <span className="font-label text-tertiary text-xs font-bold uppercase tracking-[0.2em] block mb-1">Traditional Combat</span>
              <h3 className="text-2xl font-headline font-bold text-on-surface tracking-tight">Martial Arts</h3>
            </div>
          </div>

          {/* Cyberpunk */}
          <div className="category-card group cursor-pointer relative overflow-hidden rounded-xl h-[300px]">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDnedHPYXyXCM1z5Pjpa3bgGZxd2Xt5vjsnYfZhMhpQu-ASj0zLzIXg1dvvda6OBvVfqZXX3SV8Dvu0aPlSLxQosfdkYZiyrgH5BwyY7NgmTzMI3oJx6cHjVaLO3iXj_phP2RsUM2Z6v0umHoD45yS9y3dIRR_OYaTuwxxkrWADJng4oxImTkMe_4AwiS2ghoVcL635hwLBen7PrPFd4pt4c9NAv0hMpcpBB8Rqz6q607E6SUJzqiPP2xctcQtWLbo5dimorvYKRjQ')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
            <div className="absolute inset-0 border border-secondary/30 rounded-xl transition-all duration-300 group-hover:border-secondary"></div>
            <div className="absolute bottom-0 p-6 w-full">
              <span className="font-label text-secondary text-xs font-bold uppercase tracking-[0.2em] block mb-1">Dystopian Tech</span>
              <h3 className="text-2xl font-headline font-bold text-on-surface tracking-tight">Cyberpunk</h3>
            </div>
          </div>

          {/* Heist */}
          <div className="md:col-span-2 category-card group cursor-pointer relative overflow-hidden rounded-xl h-[250px]">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCh8mrbaeUD8GBrv_uwhU7pG5TKIt6rUP9wtCLeUOcRv0eFdXEi63GNZ00AOTnx69rOJ0GJFfyC1YId2nrGGjpI0KPZkHOl98zntOnqM74vH4ayY6ghdhLzlw9br5r4a4QBM0_V3yT76WxNDBUgMxKq_GSUYqG5ZZoxnfbkjeLED8D7WGcz1OV8180L90Nd1aHVEM_4aL91BP5_L8OTJRpdmjDBasGE2jgLsL0EUkMV_0QL97pD4BpPYMQ-jRTUtEe6hiTlvX_bOZ0')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
            <div className="absolute inset-0 border border-primary/30 rounded-xl transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_16px_rgba(255,45,120,0.4)]"></div>
            <div className="absolute bottom-0 p-8 w-full flex items-center justify-between">
              <div>
                <span className="font-label text-primary text-xs font-bold uppercase tracking-[0.2em] block mb-1">Tactical Ops</span>
                <h3 className="text-3xl font-headline font-bold text-on-surface tracking-tight">Heist</h3>
              </div>
              <p className="text-on-surface-variant text-sm hidden md:block max-w-[200px]">Strategic infiltration and high-stakes precision strikes.</p>
            </div>
          </div>

          {/* Revenge */}
          <div className="category-card group cursor-pointer relative overflow-hidden rounded-xl h-[300px]">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6kSsYhnz0KBojy9MA6q0MHvka0t1H0PneVC8FVjNwvc9cabOlwdhRaVfTX56iSTYRJYo1GBg7o94EnJ8mX2C3fxaQ8bUMTcCmdyrbhvjSCWol3d02rkhStKIPEHfWcTXdqC-inlSoWRupVBIioOJVuogTx7FY4z8jesnjxsjK3sxIWl02sI2TdCvSZTBzBE2LrbL3A0qtfjb0zNN0r7Z7Gdin4KIGnuYkOVgSHF4F_OVh4ZzllzsndAnbzIQNiXQmNwro4xSgVqo')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
            <div className="absolute inset-0 border border-primary/30 rounded-xl transition-all duration-300 group-hover:border-primary"></div>
            <div className="absolute bottom-0 p-6 w-full">
              <span className="font-label text-primary text-xs font-bold uppercase tracking-[0.2em] block mb-1">Personal War</span>
              <h3 className="text-2xl font-headline font-bold text-on-surface tracking-tight">Revenge</h3>
            </div>
          </div>

          {/* Superhuman */}
          <div className="category-card group cursor-pointer relative overflow-hidden rounded-xl h-[300px]">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCtpwjeDiiWOyVCgBAlrLg8HOEglrQpkrz7RoRPRKQx8OqtWbGNcbIPbTeRdAQ8JP3NJ2KCwMVyTkALOmysMkdCg36_-MpPk7_27Q8hUqCXSzQYasQjazcj_Mu_YwovEVogdOf2UEDCL1kbm6a0Kqw-B16HW48RpZ4F-Avofgrx36waMhRvU4DOC5bOPUO6bgZ5F3bGAw_4kQ_HnRI4ty_fJGNqn11xfRYZLXu69HuJpcDdqsVX3Zp8FoqsrNG_BbUHQN_fmubvoQ0')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
            <div className="absolute inset-0 border border-tertiary/30 rounded-xl transition-all duration-300 group-hover:border-tertiary"></div>
            <div className="absolute bottom-0 p-6 w-full">
              <span className="font-label text-tertiary text-xs font-bold uppercase tracking-[0.2em] block mb-1">Augmented Power</span>
              <h3 className="text-2xl font-headline font-bold text-on-surface tracking-tight">Superhuman</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="bg-surface-container/50 border border-secondary/20 rounded-2xl p-8 flex flex-col md:flex-row justify-around items-center gap-8 backdrop-blur-sm">
          <div className="text-center">
            <span className="block text-4xl font-headline font-black text-secondary neon-text-cyan mb-2">1,240+</span>
            <span className="font-label uppercase text-xs tracking-widest text-on-surface-variant">Live Missions</span>
          </div>
          <div className="w-px h-12 bg-secondary/20 hidden md:block"></div>
          <div className="text-center">
            <span className="block text-4xl font-headline font-black text-primary neon-text-pink mb-2">48</span>
            <span className="font-label uppercase text-xs tracking-widest text-on-surface-variant">Sub-Genres</span>
          </div>
          <div className="w-px h-12 bg-secondary/20 hidden md:block"></div>
          <div className="text-center">
            <span className="block text-4xl font-headline font-black text-tertiary mb-2">24/7</span>
            <span className="font-label uppercase text-xs tracking-widest text-on-surface-variant">Active Stream</span>
          </div>
        </div>
      </section>

      <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-8 bg-surface-container-lowest border-t border-secondary/20">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="text-lg font-black font-headline text-primary">NEON-ACTION</span>
          <p className="text-on-surface-variant text-sm font-label uppercase tracking-tighter">© 2024 NEON-ACTION UNIVERSE. ACCESS GRANTED.</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6">
          {['Cyber-Action', 'High-Octane', 'Student Forums', 'Global Leaderboard', 'Support', 'Legal'].map((item, i) => (
            <a key={i} className="text-on-surface-variant hover:text-tertiary transition-colors duration-200 font-label text-xs uppercase tracking-widest hover:translate-x-1" href="#">{item}</a>
          ))}
        </nav>
        <div className="flex gap-4">
          <a className="w-8 h-8 flex items-center justify-center rounded border border-secondary/30 hover:border-secondary transition-all" href="#">
            <span className="material-symbols-outlined text-secondary text-sm">terminal</span>
          </a>
          <a className="w-8 h-8 flex items-center justify-center rounded border border-secondary/30 hover:border-secondary transition-all" href="#">
            <span className="material-symbols-outlined text-secondary text-sm">public</span>
          </a>
        </div>
      </footer>
    </main>
  );
}
