import type { ServiceSection } from '@/types/service';

type Props = Extract<ServiceSection, { type: 'table' }>;

export function TableSection({ title, intro, columns, rows, note }: Props) {
  return (
    <section data-aos="fade-up" className="rounded-3xl border border-ink/10 bg-white p-7 md:p-10">
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
      {intro && <p className="mt-4 leading-relaxed text-ink-soft">{intro}</p>}
      <div className="mt-7 overflow-x-auto rounded-2xl border border-ink/10">
        <table className="w-full text-left">
          <thead className="bg-ink text-white">
            <tr className="text-sm">
              {columns.map((c) => <th key={c} scope="col" className="whitespace-nowrap px-5 py-4 font-semibold">{c}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {rows.map((row) => (
              <tr key={row[0]} className="transition-colors even:bg-cloud hover:bg-mist">
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={`whitespace-nowrap px-5 py-4 ${i === 0 ? 'font-semibold' : 'text-ink-soft'} ${
                      i === row.length - 1 ? '!text-ink text-lg font-bold' : ''
                    }`}
                  >
                    {cell}
                  </td>
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
