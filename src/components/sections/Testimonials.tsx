import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SvgImage } from "@/components/ui/SvgImage";

export function Testimonials() {
  return (
    <section className="bg-primary py-16 text-on-primary sm:py-20">
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="reveal-item text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
            Customer stories
          </p>
          <h2 className="reveal-item mt-3 font-heading text-3xl font-bold sm:text-4xl">
            Buyers who checked first
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="reveal-item flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <div className="mb-4 flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-slate-200">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                <SvgImage
                  src={t.avatar}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border border-white/20"
                />
                <div>
                  <cite className="not-italic font-heading text-sm font-semibold text-white">
                    {t.name}
                  </cite>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
