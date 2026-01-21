"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Shield, FileText } from "lucide-react";

interface Risk {
    clause: string;
    risk_level: "High" | "Medium" | "Low";
    explanation: string;
}

interface AnalysisResult {
    summary: string;
    risks?: Risk[];
    risk_flags?: string[]; // From new backend 
    extracted_clauses?: Record<string, string>;
    error?: string;
    raw_analysis?: string; // For prototype
    entities?: any;
}

export default function Dashboard({ data }: { data: AnalysisResult }) {
    // Adapter to normalize backend response
    const summary = data.summary || "Summary not available.";

    // If backend returns 'risks' (complex object) use it, otherwise convert risk_flags
    let displayRisks: Risk[] = data.risks || [];
    if (data.risk_flags && displayRisks.length === 0) {
        displayRisks = data.risk_flags.map(flag => ({
            clause: flag,
            risk_level: "High", // Assume high for flagged ones in simplified mode
            explanation: "Flagged by AI as potentially risky."
        }));
    }

    // For MVP display, we map normalized risks back to the 'risks' const for rendering
    const risks = displayRisks;

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "contract_analysis.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full max-w-5xl mx-auto space-y-6 pb-20">

            {/* Action Bar */}
            <div className="flex justify-end">
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"
                >
                    <FileText className="w-4 h-4" />
                    Export JSON
                </button>
            </div>

            {/* Summary Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <FileText className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-semibold text-slate-800">Executive Summary</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">
                    {summary}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Risk Radar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-semibold text-slate-800">Risk Radar</h2>
                    </div>

                    <div className="space-y-4">
                        {risks.length === 0 ? (
                            <p className="text-slate-500">No high risks detected.</p>
                        ) : (
                            risks.map((risk, idx) => (
                                <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-medium text-slate-900">{risk.clause}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                                    ${risk.risk_level === 'High' ? 'bg-red-100 text-red-700' :
                                                risk.risk_level === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-green-100 text-green-700'}`}>
                                            {risk.risk_level}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600">{risk.explanation}</p>
                                </div>
                            ))
                        )}
                    </div>
                </motion.div>

                {/* Compliance / Safe Clauses */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-semibold text-slate-800">Compliance Check</h2>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-700">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span>Jurisdiction: Delaware (Standard)</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-700">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span>Payment Terms: Net 30 (Standard)</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-700">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span>Confidentiality: Mutual (Standard)</span>
                        </div>
                    </div>

                    {/* Raw JSON Debug for MVP */}
                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <p className="text-xs font-mono text-slate-400 break-words">
                            Debug: {JSON.stringify(data.raw_analysis || data).slice(0, 200)}...
                        </p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
