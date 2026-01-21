"use client";

import UploadZone from "@/components/UploadZone";
import Dashboard from "@/components/Dashboard";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <main className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[80vh] gap-8">
        <AnimatePresence mode="wait">
          {!analysisResult ? (
            <motion.div
              key="upload"
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center gap-8"
            >
              <div className="text-center space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium uppercase tracking-wider mb-4">
                  AI-Powered Legal Assistant
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tight">
                  Simplify your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                    Legal Reviews
                  </span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                  Upload any contract to instantly get plain-language summaries,
                  risk analysis, and key clause extraction.
                </p>
              </div>

              <div className="w-full mt-8">
                <UploadZone onAnalysisComplete={setAnalysisResult} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <div className="mb-8 text-center md:text-left">
                <button
                  onClick={() => setAnalysisResult(null)}
                  className="text-sm text-slate-500 hover:text-slate-800 transition-colors mb-4"
                >
                  ← Upload another contract
                </button>
                <h1 className="text-3xl font-bold text-slate-900">Analysis Results</h1>
              </div>
              <Dashboard data={analysisResult} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
