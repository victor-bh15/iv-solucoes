"use client";

import { MessageCircle, Mail, Clock, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { AuroraBackground } from "@/components/AuroraBackground";
import { useLang } from "@/components/providers/LanguageProvider";
import { site, whatsappLink } from "@/lib/site";

export function Contato({ showHeading = true }: { showHeading?: boolean }) {
  const { t } = useLang();

  return (
    <section id="contato" className="relative overflow-hidden py-20 sm:py-28">
      <AuroraBackground variant="subtle" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {showHeading && (
          <SectionHeading
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            subtitle={t.contact.subtitle}
          />
        )}

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          {/* WhatsApp em destaque */}
          <Reveal className="md:col-span-2">
            <a
              href={whatsappLink(t.contact.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl bg-linear-to-br from-electric via-iris to-violet p-7 text-white shadow-xl shadow-iris/20 transition-transform hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <MessageCircle className="h-7 w-7" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display text-lg font-bold">
                    {t.contact.whatsappCta}
                  </p>
                  <p className="mt-0.5 text-sm text-white/70">
                    {site.whatsappDisplay} • {t.contact.whatsappDesc}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
            </a>
          </Reveal>

          {/* E-mails */}
          <Reveal delay={120} className="ring-gradient rounded-2xl border border-border bg-surface/70 p-7 backdrop-blur-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-iris/12 text-brand-strong">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">
              {t.contact.emailLabel}
            </h3>
            <ul className="mt-3 space-y-2">
              {site.emails.map((email) => (
                <li key={email}>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {email}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Horário */}
          <Reveal delay={200} className="ring-gradient rounded-2xl border border-border bg-surface/70 p-7 backdrop-blur-sm">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-iris/12 text-brand-strong">
              <Clock className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">
              {t.contact.hoursLabel}
            </h3>
            <p className="mt-3 text-sm text-muted">{t.contact.hoursValue}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
