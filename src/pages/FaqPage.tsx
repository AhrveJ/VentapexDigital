import { Seo } from '@/components/seo/Seo';
import { faqSchema } from '@/components/seo/schema';
import { PageHero } from '@/components/service/PageHero';
import { FaqSection } from '@/components/sections/FaqSection';
import { faqs } from '@/data/faqs';

export default function FaqPage() {
  return (
    <>
      <Seo
        title="FAQs"
        description="Answers to common questions about our accounting, bookkeeping, payroll and tax services."
        path="/faqs"
        jsonLd={[faqSchema(faqs)]}
      />
      <PageHero
        eyebrow="FAQs"
        title="Frequently asked questions."
        lead="Everything people usually ask before working with us. Can't find your answer? Send us a message and we'll reply within one business day."
        primaryAction={{ label: 'Ask us a question', to: '/contact#inquiry' }}
        crumbs={[{ name: 'Home', to: '/' }, { name: 'FAQs' }]}
      />
      <FaqSection faqs={faqs} more={{ label: 'Ask us a question', to: '/contact#inquiry' }} />
    </>
  );
}
