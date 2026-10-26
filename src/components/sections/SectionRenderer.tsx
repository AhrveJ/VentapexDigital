import type { ServiceSection } from '@/types/service';
import { TextSection } from './TextSection';
import { ListSection } from './ListSection';
import { HighlightSection } from './HighlightSection';
import { TableSection } from './TableSection';

/** Add a new section type: extend the union in types/service.ts, add a case here. */
export function SectionRenderer({ section }: { section: ServiceSection }) {
  switch (section.type) {
    case 'text': return <TextSection {...section} />;
    case 'list': return <ListSection {...section} />;
    case 'highlight': return <HighlightSection {...section} />;
    case 'table': return <TableSection {...section} />;
  }
}
