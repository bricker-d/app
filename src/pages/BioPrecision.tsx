import React from "react";
import { useNavigate } from "react-router-dom";

const BioPrecision: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top bar */}
      <header className="w-full border-b border-slate-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-4">
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold">BioPrecision</span>
            <span className="text-xs text-slate-500">
              Your daily physiology snapshot
            </span>
          </div>
          <button
            className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700"
            onClick={() => navigate("/settings")}
          >
            Settings
          </button>
        </div>
      </header>

      {/* Scrollable content */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-4 pb-24">
          {/* Today summary */}
          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-medium text-slate-500 mb-1">
                Today&apos;s Status
              </div>
              <div className="text-lg font-semibold">On track</div>
              <div className="mt-2 text-xs text-slate-500">
                Core metrics are within your typical range.
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-medium text-slate-500 mb-1">
                Recovery
              </div>
              <div className="text-2xl font-semibold">Medium</div>
              <div className="mt-2 text-xs text-slate-500">
                Good for training, avoid all-out efforts late today.
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-medium text-slate-500 mb-1">
                Focus Window
              </div>
              <div className="text-2xl font-semibold">Now</div>
              <div className="mt-2 text-xs text-slate-500">
                This is a high-quality block for deep work.
              </div>
            </div>
          </section>

          {/* Quick actions */}
          <section className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Quick Actions</h2>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => navigate("/data-entry")}
                  className="rounded-full border border-emerald-500/70 bg-emerald-500/10 px-3 py-1 font-medium text-emerald-700"
                >
                  Log today&apos;s biomarkers
                </button>
                <button
                  onClick={() => navigate("/photo-entry")}
                  className="rounded-full border border-slate-300 px-3 py-1 text-slate-700"
                >
                  Add photo entry
                </button>
                <button
                  onClick={() => navigate("/labs-optimization")}
                  className="rounded-full border border-slate-300 px-3 py-1 text-slate-700"
                >
                  Review labs
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Today&apos;s Plan</h2>
              </div>
              <ul className="space-y-1 text-xs text-slate-600">
                <li>• Confirm last night&apos;s sleep and strain.</li>
                <li>• Log any symptoms, soreness, or brain fog.</li>
                <li>• Choose 1–2 actions to improve tomorrow&apos;s profile.</li>
              </ul>
            </div>
          </section>

          {/* Trends placeholder */}
          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Recent Trends</h2>
              <span className="text-xs text-slate-500">
                Last 7–14 days • placeholder
              </span>
            </div>
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-center text-xs text-slate-500">
              Trend visualization will live here (HRV, sleep, strain, labs,
              etc.).
            </div>
          </section>

          <div className="h-6" />
        </div>
      </main>
    </div>
  );
};

export default BioPrecision;
