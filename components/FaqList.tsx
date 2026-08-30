import type { Faq } from "@/data/pages";

export default function FaqList({ faqs }: { faqs: Faq[] }) {
  if (!faqs.length) return null;
  return (
    <div className="ac-faq">
      {faqs.map((f) => (
        <details key={f.q} className="ac-faq-item">
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
