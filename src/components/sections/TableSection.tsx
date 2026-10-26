import type { ServiceSection } from '@/types/service';

type Props = Extract<ServiceSection, { type: 'table' }>;

export function TableSection({ title, intro, columns, rows, note }: Props) {
  return (
    <section>
      <h2 className="text-3xl font-semibold">{title}</h2>
      {intro && <p className="mt-4 leading-relaxed text-ink-soft">{intro}</p>}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-y border-ink/10 text-left">
          <thead>
            <tr className="border-b border-ink/10 text-sm text-ink-soft">
              {columns.map((c) => <th key={c} scope="col" className="py-3 pr-6 font-semibold">{c}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td key={i} className={`py-4 pr-6 ${i === row.length - 1 ? 'font-semibold' : ''}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="mt-4 text-sm leading-relaxed text-ink-soft">{note}</p>}
    </section>
  );
}
