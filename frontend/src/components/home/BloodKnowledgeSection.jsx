import { Link } from "react-router-dom";

function BloodKnowledgeSection() {
  const groups = [
    { group: "O-", note: "Universal donor in emergencies", tone: "bg-red-50 text-red-700" },
    { group: "O+", note: "Common donor for O+ recipients", tone: "bg-amber-50 text-amber-700" },
    { group: "A+", note: "Often needed for surgery and trauma care", tone: "bg-blue-50 text-blue-700" },
    { group: "AB+", note: "Universal plasma recipient", tone: "bg-green-50 text-green-700" },
  ];

  const uses = [
    "Trauma and accident response",
    "Surgery and transplant support",
    "Obstetric and neonatal care",
    "Cancer and anemia treatment",
  ];

  return (
    <section className="py-24 bg-[#130a0c] text-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300 mb-4">
            Blood education
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
            Blood group knowledge helps people act faster in emergencies.
          </h2>
          <p className="text-white/70 text-lg mt-6 max-w-2xl">
            Knowing the right blood group, compatibility, and the situations where
            blood is used helps donors, families, and hospitals make better decisions
            under pressure.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            {groups.map((item) => (
              <div key={item.group} className="rounded-[24px] bg-white/8 border border-white/10 p-5">
                <div className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${item.tone}`}>
                  {item.group}
                </div>
                <p className="mt-4 text-white/80">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="matte-panel rounded-[32px] p-8 text-[#130a0c]">
          <h3 className="text-2xl font-bold">Where donated blood is used</h3>
          <ul className="mt-6 space-y-4">
            {uses.map((use) => (
              <li key={use} className="flex items-start gap-3 rounded-2xl bg-[#faf8f8] p-4">
                <span className="mt-1 h-3 w-3 rounded-full bg-[#c1121f]" />
                <span className="text-gray-700">{use}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-[24px] bg-[#fff1f3] p-5">
            <p className="font-semibold text-[#c1121f]">Compatibility tip</p>
            <p className="text-gray-700 mt-2">
              When every minute matters, O- can be used widely and AB+ can receive from
              all groups. Always confirm with a medical professional.
            </p>
          </div>

          <Link
            to="/emergency-search"
            className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-[#c1121f] px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#9b1528]"
          >
            Search by blood group
          </Link>
        </div>
      </div>
    </section>
  );
}

export default BloodKnowledgeSection;
