"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { summarizeContract } from "@/lib/apiClient";

interface UploadZoneProps {
    onAnalysisComplete: (data: any) => void;
}

export default function UploadZone({ onAnalysisComplete }: UploadZoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const removeFile = () => setFile(null);

    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = async () => {
        if (!file) return;

        setIsAnalyzing(true);
        try {
            const data = await summarizeContract(file);
            onAnalysisComplete(data);
        } catch (error) {
            console.error("Analysis failed:", error);
            alert("Analysis failed. Check console for details.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <AnimatePresence>
                {!file ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={cn(
                            "relative group cursor-pointer flex flex-col items-center justify-center w-full h-64 rounded-3xl border-2 border-dashed transition-all duration-300 ease-out",
                            isDragging
                                ? "border-blue-500 bg-blue-50/50 scale-[1.02] shadow-xl shadow-blue-500/10"
                                : "border-slate-200 bg-white/50 hover:border-blue-400 hover:bg-slate-50"
                        )}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleChange}
                            accept=".pdf,.docx,.doc,.txt"
                        />

                        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                            <div className={cn(
                                "p-4 rounded-full transition-colors duration-300",
                                isDragging ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-500"
                            )}>
                                <Upload className="w-8 h-8" />
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-slate-700">
                                    Drop your contract here
                                </p>
                                <p className="text-sm text-slate-500 mt-1">
                                    or click to browse checks
                                </p>
                            </div>
                            <p className="text-xs text-slate-400 mt-4">
                                Supports PDF, DOCX, TXT
                            </p>
                        </div>

                        {/* Animated Background Gradient */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5" />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full p-6 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center gap-4"
                    >
                        <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">
                                {file.name}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                                {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={removeFile}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing}
                                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-slate-900/20 active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isAnalyzing ? "Analyzing..." : "Analyze"}
                                {!isAnalyzing && <CheckCircle className="w-4 h-4" />}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
