
import { ClockIcon } from "../../assets/Icons";

export const PhasesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <section className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="text-[#003366] w-5 h-5 flex items-center">
              <ClockIcon />
            </span>
            Phase History
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Phase</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Target</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Achieved</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Remarks</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              <tr>
                <td className="px-6 py-5 font-semibold">Phase 1</td>
                <td className="px-6 py-5">400</td>
                <td className="px-6 py-5">420</td>
                <td className="px-6 py-5 text-green-600 font-bold">Qualified</td>
                <td className="px-6 py-5 text-slate-500">Target met</td>
              </tr>

              <tr className="bg-[#003366]/2">
                <td className="px-6 py-5 font-semibold text-[#003366]">Phase 2</td>
                <td className="px-6 py-5">500</td>
                <td className="px-6 py-5">480</td>
                <td className="px-6 py-5 text-orange-600 font-bold">In Progress</td>
                <td className="px-6 py-5">Under review</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
