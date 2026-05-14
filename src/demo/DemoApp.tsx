import { useMemo, useState } from "react";
import { Odontogram } from "../lib/components/Odontogram/Odontogram";
import type { OdontogramChange, ToothCondition } from "../lib/types";
import { mockOdontogramData } from "./mockData";

export function DemoApp() {
  const [data, setData] = useState<OdontogramChange>(mockOdontogramData);
  const [selectedCondition, setSelectedCondition] = useState<ToothCondition>("CARIES");
  const serialized = useMemo(() => JSON.stringify(data, null, 2), [data]);

  return (
    <main className="ov-min-h-screen ov-overflow-x-hidden ov-bg-[linear-gradient(180deg,_#f7fbfc_0%,_#e2eef1_55%,_#d4e5ea_100%)] ov-px-3 ov-py-6 ov-text-slate-900 sm:ov-px-4 sm:ov-py-8 md:ov-px-8">
      <div className="ov-mx-auto ov-flex ov-max-w-7xl ov-flex-col ov-gap-4 sm:ov-gap-6">
        <header className="ov-grid ov-gap-4 ov-rounded-[28px] ov-border ov-border-white/80 ov-bg-white/80 ov-p-4 ov-shadow-panel sm:ov-rounded-[32px] sm:ov-p-6">
          <div className="ov-flex ov-flex-col ov-gap-2">
            <span className="ov-text-xs ov-font-semibold ov-uppercase ov-tracking-[0.3em] ov-text-clinic-700">
              npm library demo
            </span>
            <h1 className="ov-m-0 ov-text-2xl ov-font-semibold sm:ov-text-3xl md:ov-text-4xl">odontogram-view</h1>
            <p className="ov-m-0 ov-max-w-3xl ov-text-sm ov-leading-6 ov-text-slate-600 md:ov-text-base">
              Odontograma reusable para React con dentición permanente, temporal y mixta,
              superficies clickeables, estados clínicos y salida serializable lista para sistemas
              odontológicos.
            </p>
          </div>
        </header>

        <Odontogram
          value={data}
          onChange={setData}
          dentition="mixed"
          selectedCondition={selectedCondition}
          onSelectedConditionChange={setSelectedCondition}
          size="xs"
        />

        <section className="ov-grid ov-gap-4 lg:ov-grid-cols-[1.25fr_0.75fr]">
          <article className="ov-min-w-0 ov-rounded-[24px] ov-border ov-border-white/80 ov-bg-white/85 ov-p-4 ov-shadow-panel sm:ov-rounded-[28px] sm:ov-p-5">
            <div className="ov-mb-3 ov-flex ov-flex-col ov-gap-3 sm:ov-flex-row sm:ov-items-center sm:ov-justify-between">
              <h2 className="ov-m-0 ov-text-lg ov-font-semibold">Datos serializados</h2>
              <button
                type="button"
                className="ov-w-full ov-rounded-full ov-border ov-border-slate-200 ov-px-3 ov-py-2 ov-text-sm ov-text-slate-600 hover:ov-border-clinic-400 hover:ov-text-clinic-700 sm:ov-w-auto"
                onClick={() => setData(mockOdontogramData)}
              >
                Restaurar mock
              </button>
            </div>
            <pre className="ov-overflow-x-auto ov-rounded-2xl ov-bg-slate-950 ov-p-3 ov-text-xs ov-leading-6 ov-text-emerald-300 sm:ov-p-4">
              {serialized}
            </pre>
          </article>

          <article className="ov-min-w-0 ov-rounded-[24px] ov-border ov-border-white/80 ov-bg-white/85 ov-p-4 ov-shadow-panel sm:ov-rounded-[28px] sm:ov-p-5">
            <h2 className="ov-m-0 ov-text-lg ov-font-semibold">Uso controlado</h2>
            <pre className="ov-mt-3 ov-overflow-x-auto ov-rounded-2xl ov-bg-slate-100 ov-p-3 ov-text-xs ov-leading-6 ov-text-slate-700 sm:ov-p-4">
              {`const [odontogramData, setOdontogramData] = useState(mockData);

<Odontogram
  value={odontogramData}
  onChange={setOdontogramData}
/>`}
            </pre>
          </article>
        </section>
      </div>
    </main>
  );
}
