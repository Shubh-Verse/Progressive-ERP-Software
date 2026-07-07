"use client";

import { useState } from "react";
import { Plus, Trash2, Search, Save } from "lucide-react";
// import ProjectInformation from "./ProjectInformation";
import BOQReferencePanel from "@/components/reference/BOQReferencePanel";
import ReferenceSearchDialog from "@/components/reference/ReferenceSearchDialog";

export type CostItemType = "material" | "labour";

export interface RateAnalysisLine {
  id?: string;
  cost_type: CostItemType;
  material_id?: string;
  labour_id?: string;
  code: string;
  description: string;
  unit: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Props {
  item: any;
  materialMaster?: Array<{ id: string; code: string; name: string; unit: string; current_rate: number }>;
  labourMaster?: Array<{ id: string; code: string; labour_type: string; unit: string; rate: number }>;
  onSave?: (payload: { totals: any; lines: RateAnalysisLine[] }) => Promise<void>;
}

export default function EditBOQWorkspace({
  item,
  materialMaster = [
    { id: "m1", code: "2826", name: "40 mm dia. G.I. pipe (medium class)", unit: "meter", current_rate: 383.40 },
    { id: "m2", code: "2922", name: "CI/MS cover plate hinged to frame with Locking arrangement", unit: "each", current_rate: 315.00 },
    { id: "m3", code: "2836", name: "40 mm to 20 mm reducer", unit: "each", current_rate: 36.00 },
    { id: "m4", code: "2918", name: "Funnel item component", unit: "each", current_rate: 22.50 },
    { id: "m5", code: "2533", name: "33KV HT Cable XLPE 3Cx300 Sq.mm", unit: "meter", current_rate: 15498.00 }
  ],
  labourMaster = [
    { id: "l1", code: "1001", labour_type: "Wireman", unit: "day", rate: 806.00 },
    { id: "l2", code: "1007", labour_type: "Khallasi / Helper", unit: "day", rate: 663.00 },
    { id: "l3", code: "1010", labour_type: "Mason, Grade 2", unit: "day", rate: 734.00 },
    { id: "l4", code: "1012", labour_type: "Beldar / Coolie", unit: "day", rate: 663.00 }
  ],
  onSave
}: Props) {
  const [showSearch, setShowSearch] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<any>(null);

  const [lines, setLines] = useState<RateAnalysisLine[]>(item.boq_rate_analysis?.boq_rate_analysis_lines || []);
  const [cartagePercent, setCartagePercent] = useState<number>(item.boq_rate_analysis?.cartage_percent || 1);
  const [gstPercent, setGstPercent] = useState<number>(item.boq_rate_analysis?.gst_percent || 12);
  const [marginPercent, setMarginPercent] = useState<number>(item.boq_rate_analysis?.margin_percent || 15);

  const [activeModal, setActiveModal] = useState<CostItemType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const materials = lines.filter((l) => l.cost_type === "material");
  const labour = lines.filter((l) => l.cost_type === "labour");

  const materialCost = materials.reduce((sum, l) => sum + l.quantity * l.rate, 0);
  const cartageAmount = (materialCost * cartagePercent) / 100;
  const labourCost = labour.reduce((sum, l) => sum + l.quantity * l.rate, 0);

  const baseTotal = materialCost + cartageAmount + labourCost;
  const gstAmount = (baseTotal * gstPercent) / 100;
  const preMarginTotal = baseTotal + gstAmount;

  const overheadProfitAmount = (preMarginTotal * marginPercent) / 100;
  const ratePerSet = preMarginTotal + overheadProfitAmount;
  const finalSayRate = Math.round(ratePerSet * 100) / 100;

  const handleLineChange = (globalIndex: number, field: "quantity" | "rate", value: number) => {
    const updated = [...lines];
    updated[globalIndex] = {
      ...updated[globalIndex],
      [field]: value,
      amount: field === "quantity" ? value * updated[globalIndex].rate : updated[globalIndex].quantity * value,
    };
    setLines(updated);
  };

  const removeLine = (globalIndex: number) => {
    setLines(lines.filter((_, i) => i !== globalIndex));
  };

  const addMasterItem = (masterItem: any, type: CostItemType) => {
    const newLine: RateAnalysisLine = {
      cost_type: type,
      code: masterItem.code,
      description: type === "labour" ? masterItem.labour_type : masterItem.name,
      unit: masterItem.unit,
      quantity: 1,
      rate: type === "labour" ? masterItem.rate : masterItem.current_rate,
      amount: type === "labour" ? masterItem.rate : masterItem.current_rate,
      material_id: type === "material" ? masterItem.id : undefined,
      labour_id: type === "labour" ? masterItem.id : undefined,
    };
    setLines([...lines, newLine]);
    setActiveModal(null);
    setSearchQuery("");
  };

  const handleApplyRate = async () => {
    if (!onSave) return;
    setIsSaving(true);
    try {
      await onSave({
        totals: {
          material_total: materialCost,
          cartage_amount: cartageAmount,
          labour_total: labourCost,
          direct_cost: baseTotal,
          gst_amount: gstAmount,
          total_cost: preMarginTotal,
          margin_amount: overheadProfitAmount,
          quoted_rate: finalSayRate,
          cartage_percent: cartagePercent,
          gst_percent: gstPercent,
          margin_percent: marginPercent
        },
        lines,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredMaterials = materialMaster.filter(
    (m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.code.includes(searchQuery)
  );
  const filteredLabour = labourMaster.filter(
    (l) => l.labour_type.toLowerCase().includes(searchQuery.toLowerCase()) || l.code.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* <ProjectInformation project={item.projects} /> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* LEFT WINDOW: Unified DSR Worksheets */}
        <div className="bg-white border border-slate-300 shadow-xs rounded-lg overflow-hidden text-xs text-slate-900 h-full flex flex-col justify-between">
          <div>
            {/* Client BOQ Read-Only Details */}
            <div className="p-4 bg-slate-50/90 border-b border-slate-300">
              {item.parent_serial && (
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-1">
                  Group Context: {item.parent_serial} — {item.category || "MAIN SYSTEM ROSTER"}
                </div>
              )}
              <div className="flex justify-between items-center border-b border-slate-200 pb-1.5 mb-1.5">
                <div>
                  <span className="text-slate-400 font-medium mr-1">BOQ Serial:</span>
                  <span className="font-bold text-blue-700 font-mono text-sm">{item.serial_no || "2.1"}</span>
                </div>
                <div className="flex gap-3 text-slate-500 font-medium text-[11px]">
                  <span>Category: <strong className="text-slate-700">{item.category || "HT Installation"}</strong></span>
                  <span>Unit: <strong className="text-slate-700 font-mono">{item.unit || "RM"}</strong></span>
                  <span>Qty: <strong className="text-slate-700 font-mono">{item.quantity || 1}</strong></span>
                </div>
              </div>
              <p className="text-slate-800 font-medium leading-relaxed bg-white p-2.5 rounded border border-slate-200 shadow-xs/10">
                {item.description || "Client BOQ Item Description"}
              </p>
              <div className="text-slate-400 text-[10px] mt-2 italic">
                Details of cost for one unit metrics base below
              </div>
            </div>

            {/* FIXED HEADER ROW: Clean, single border columns across entire line layout depth */}
            {/* <div className="bg-slate-100 border-b border-slate-300 font-semibold text-slate-700 flex text-center items-center">
              <div className="p-2 w-20 text-left border-r border-slate-200 shrink-0">ICD No.</div>
              <div className="p-2 text-left border-r border-slate-200 flex-1">Description</div>
              <div className="p-2 w-16 border-r border-slate-200 shrink-0">Unit</div>
              <div className="p-2 w-20 border-r border-slate-200 text-right shrink-0">Qty</div>
              <div className="p-2 w-20 border-r border-slate-200 text-right shrink-0">Rate</div>
              <div className="p-2 w-28 text-right shrink-0">Amount (₹)</div>
            </div> */}

            {/* ================= MATERIALS BREAKDOWN ================= */}
            <div className="bg-slate-50/80 font-bold border-b border-slate-200 text-slate-700 flex justify-between items-center px-3 py-1.5">
              <span className="tracking-wider uppercase text-[10px]">MATERIALS</span>
              <button
                type="button"
                onClick={() => setActiveModal("material")}
                className="text-[10px] bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold px-2 py-0.5 rounded transition-colors"
              >
                + Add Material
              </button>
            </div>

            {lines.map((l, idx) => {
              if (l.cost_type !== "material") return null;
              return (
                <div key={idx} className="border-b border-slate-200 hover:bg-slate-50/40 flex items-center">
                  <div className="p-2 w-20 font-mono text-slate-500 border-r border-slate-100 shrink-0">{l.code}</div>
                  <div className="p-2 border-r border-slate-100 flex-1 break-words">{l.description}</div>
                  <div className="p-2 w-16 text-center text-slate-600 border-r border-slate-100 shrink-0">{l.unit}</div>
                  <div className="p-1 w-20 border-r border-slate-100 text-right shrink-0">
                    <input
                      type="number"
                      step="any"
                      value={l.quantity}
                      onChange={(e) => handleLineChange(idx, "quantity", parseFloat(e.target.value) || 0)}
                      className="w-full px-1.5 py-0.5 border border-slate-300 rounded text-right font-mono text-xs focus:outline-none"
                    />
                  </div>
                  <div className="p-1 w-20 border-r border-slate-100 text-right shrink-0">
                    <input
                      type="number"
                      step="any"
                      value={l.rate}
                      onChange={(e) => handleLineChange(idx, "rate", parseFloat(e.target.value) || 0)}
                      className="w-full px-1.5 py-0.5 border border-slate-300 rounded text-right font-mono text-xs focus:outline-none"
                    />
                  </div>
                  <div className="p-2 w-28 text-right font-mono font-medium shrink-0">
                    {l.amount.toFixed(2)}
                  </div>
                  <div className="p-1 w-10 text-center shrink-0">
                    <button type="button" onClick={() => removeLine(idx)} className="text-slate-400 hover:text-red-500">
                      <Trash2 className="w-3.5 h-3.5 mx-auto" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Materials Summary Line */}
            <div className="border-b border-slate-200 font-medium bg-slate-50/20 flex items-center">
              <div className="p-2 text-slate-700 pl-4 font-semibold flex-1">Total cost of materials</div>
              <div className="p-2 w-28 text-right font-mono font-bold text-slate-950 shrink-0">
                {materialCost.toFixed(2)}
              </div>
              <div className="w-10 shrink-0"></div>
            </div>

            <div className="border-b border-slate-200 text-slate-600 italic flex items-center bg-white">
              <div className="p-2 pl-4 flex-1 flex items-center justify-between">
                <span>Cartage @</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={cartagePercent}
                    onChange={(e) => setCartagePercent(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-10 px-1 py-0.5 border border-slate-300 rounded text-right font-mono text-xs not-italic"
                  />
                  <span className="font-medium text-slate-400 not-italic">%</span>
                </div>
              </div>
              <div className="p-2 w-28 text-right font-mono shrink-0">
                {cartageAmount.toFixed(2)}
              </div>
              <div className="w-10 shrink-0"></div>
            </div>

            {/* ================= LABOUR BREAKDOWN ================= */}
            <div className="bg-slate-50/80 font-bold border-b border-slate-200 text-slate-700 flex justify-between items-center px-3 py-1.5 border-t border-slate-300">
              <span className="tracking-wider uppercase text-[10px]">LABOUR</span>
              <button
                type="button"
                onClick={() => setActiveModal("labour")}
                className="text-[10px] bg-blue-50 text-blue-600 hover:bg-blue-100 font-semibold px-2 py-0.5 rounded transition-colors"
              >
                + Add Labour Rate
              </button>
            </div>

            {lines.map((l, idx) => {
              if (l.cost_type !== "labour") return null;
              return (
                <div key={idx} className="border-b border-slate-200 hover:bg-slate-50/40 flex items-center">
                  <div className="p-2 w-20 font-mono text-slate-500 border-r border-slate-100 shrink-0">{l.code}</div>
                  <div className="p-2 border-r border-slate-100 flex-1 break-words">{l.description}</div>
                  <div className="p-2 w-16 text-center text-slate-600 border-r border-slate-100 shrink-0">{l.unit}</div>
                  <div className="p-1 w-20 border-r border-slate-100 text-right shrink-0">
                    <input
                      type="number"
                      step="any"
                      value={l.quantity}
                      onChange={(e) => handleLineChange(idx, "quantity", parseFloat(e.target.value) || 0)}
                      className="w-full px-1.5 py-0.5 border border-slate-300 rounded text-right font-mono text-xs focus:outline-none"
                    />
                  </div>
                  <div className="p-1 w-20 border-r border-slate-100 text-right shrink-0">
                    <input
                      type="number"
                      step="any"
                      value={l.rate}
                      onChange={(e) => handleLineChange(idx, "rate", parseFloat(e.target.value) || 0)}
                      className="w-full px-1 py-0.5 border border-slate-300 rounded text-right font-mono text-xs focus:outline-none"
                    />
                  </div>
                  <div className="p-2 w-28 text-right font-mono font-medium shrink-0">
                    {l.amount.toFixed(2)}
                  </div>
                  <div className="p-1 w-10 text-center shrink-0">
                    <button type="button" onClick={() => removeLine(idx)} className="text-slate-400 hover:text-red-500">
                      <Trash2 className="w-3.5 h-3.5 mx-auto" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Summary Engine Rows */}
          <div>
            <div className="bg-slate-100 border-t border-slate-400 border-b border-slate-300 font-bold text-slate-900 flex items-center">
              <div className="p-2 uppercase text-[10px] pl-4 flex-1">TOTAL DIRECT COST</div>
              <div className="p-2 w-28 text-right font-mono shrink-0">{baseTotal.toFixed(2)}</div>
              <div className="w-10 shrink-0"></div>
            </div>

            <div className="border-b border-slate-200 text-slate-600 flex items-center bg-white">
              <div className="p-2 pl-4 flex-1 flex items-center justify-between">
                <span>Add GST</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={gstPercent}
                    onChange={(e) => setGstPercent(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-10 px-1 py-0.5 border border-slate-300 rounded text-right font-mono text-xs"
                  />
                  <span className="font-medium text-slate-400">%</span>
                </div>
              </div>
              <div className="p-2 w-28 text-right font-mono shrink-0">{gstAmount.toFixed(2)}</div>
              <div className="w-10 shrink-0"></div>
            </div>

            <div className="border-b border-slate-200 font-semibold bg-slate-50/40 text-slate-800 flex items-center">
              <div className="p-2 pl-4 flex-1">TOTAL</div>
              <div className="p-2 w-28 text-right font-mono shrink-0">{preMarginTotal.toFixed(2)}</div>
              <div className="w-10 shrink-0"></div>
            </div>

            <div className="border-b border-slate-200 text-slate-600 flex items-center bg-white">
              <div className="p-2 pl-4 flex-1 flex items-center justify-between">
                <span>OVERHEADS & PROFIT @</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={marginPercent}
                    onChange={(e) => setMarginPercent(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-10 px-1 py-0.5 border border-slate-300 rounded text-right font-mono text-xs"
                  />
                  <span className="font-medium text-slate-400">%</span>
                </div>
              </div>
              <div className="p-2 w-28 text-right font-mono text-slate-900 shrink-0">{overheadProfitAmount.toFixed(2)}</div>
              <div className="w-10 shrink-0"></div>
            </div>

            <div className="bg-blue-50/60 font-bold text-blue-950 flex items-center h-11">
              <div className="p-3 text-[11px] pl-4 uppercase tracking-wide flex-1">Say (Final Quoted Unit Rate)</div>
              <div className="p-3 w-28 text-right font-mono text-sm text-blue-900 shrink-0">
                ₹{finalSayRate.toFixed(2)}
              </div>
              <div className="p-2 w-10 text-center shrink-0 bg-white h-full flex items-center justify-center">
                <button
                  type="button"
                  onClick={handleApplyRate}
                  disabled={isSaving}
                  className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-xs transition-colors disabled:opacity-50"
                  title="Apply Rate to BOQ"
                >
                  <Save className="w-3.5 h-3.5 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT WINDOW: CPWD Reference PDF Frame */}
        <div className="h-full flex flex-col">
          <div className="flex-1 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs h-full">
            <BOQReferencePanel
              chapter={selectedChapter}
              onSearch={() => setShowSearch(true)}
            />
          </div>
        </div>
      </div>

      <ReferenceSearchDialog
        open={showSearch}
        onClose={() => setShowSearch(false)}
        onSelect={(chapter: any) => {
          setSelectedChapter(chapter);
          setShowSearch(false);
        }}
      />

      {/* Popups */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md shadow-xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col max-h-[70vh]">
            <div className="p-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase text-slate-700 tracking-wider">Select Master {activeModal}</h4>
              <button type="button" onClick={() => { setActiveModal(null); setSearchQuery(""); }} className="text-slate-400 font-medium">✕</button>
            </div>
            <div className="p-2 border-b border-slate-200 bg-slate-50/50 flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder={`Search related ${activeModal}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-800 focus:outline-none"
                autoFocus
              />
            </div>
            <div className="overflow-y-auto divide-y divide-slate-100 flex-1 bg-white">
              {activeModal === "labour" ? (
                filteredLabour.map((l) => (
                  <button key={l.id} type="button" onClick={() => addMasterItem(l, "labour")} className="w-full text-left p-2.5 hover:bg-slate-50 flex justify-between items-center text-xs">
                    <div><span className="font-mono text-slate-400 mr-1.5">[{l.code}]</span>{l.labour_type}</div>
                    <div className="font-mono text-slate-500">₹{l.rate}/{l.unit}</div>
                  </button>
                ))
              ) : (
                filteredMaterials.map((m) => (
                  <button key={m.id} type="button" onClick={() => addMasterItem(m, "material")} className="w-full text-left p-2.5 hover:bg-slate-50 flex justify-between items-center text-xs">
                    <div><span className="font-mono text-slate-400 mr-1.5">[{m.code}]</span>{m.name}</div>
                    <div className="font-mono text-slate-500">₹{m.current_rate}/{m.unit}</div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}