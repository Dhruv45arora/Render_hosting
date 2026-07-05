import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="ac-faq">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div className="ac-faq-item" key={faq.q}>
            <button
              className="ac-faq-q"
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              {faq.q}
              <Plus size={20} className={`ac-faq-icon ${isOpen ? 'open' : ''}`} />
            </button>
            {isOpen && <div className="ac-faq-a">{faq.a}</div>}
          </div>
        );
      })}
    </div>
  );
}
