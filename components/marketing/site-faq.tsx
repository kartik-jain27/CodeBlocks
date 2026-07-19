"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Can I use CodeBlocks for client and commercial projects?",
    answer:
      "Yes. Free blocks are licensed for commercial use, and a Pro purchase includes a commercial license for every pro block as well.",
  },
  {
    question: "Do I get future blocks after I purchase Pro?",
    answer:
      "Yes. A Pro purchase is a one-time payment that includes every pro block added after your purchase, not just what's available today.",
  },
  {
    question: "Can I share one Pro license across my team?",
    answer:
      "A Pro license issues a single registry token tied to your account. If you need multiple teammates installing pro blocks, the Team plan covers 5 seats under one shared license.",
  },
  {
    question: "What happens if my registry token leaks?",
    answer:
      "Rotate it any time from your account page. The old token stops working the moment you rotate — no need to contact support.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Because this is a one-time digital purchase, we do not offer refunds.",
  },
];

export function SiteFaq() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <section aria-labelledby="faq-heading" className="mx-auto w-full max-w-5xl">
      <h2
        id="faq-heading"
        className="text-center text-2xl font-semibold text-foreground sm:text-3xl"
      >
        Frequently asked questions
      </h2>
      <div className="mt-8 w-full overflow-hidden rounded-2xl bg-surface shadow-[var(--category-shadow)]">
        {faqs.map((item, index) => {
          const isOpen = openQuestion === index;

          return (
            <div
              key={item.question}
              className="border-b border-border-muted last:border-b-0"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-medium text-foreground"
                onClick={() => setOpenQuestion(isOpen ? null : index)}
              >
                <span className="min-w-0">{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-out ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="px-6 pb-5 text-sm leading-6 text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
