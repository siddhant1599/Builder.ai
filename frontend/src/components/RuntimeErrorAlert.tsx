
import { AlertCircle, X, Wrench, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface RuntimeError {
    message: string;
    source?: string;
    lineno?: number;
    colno?: number;
    filename?: string;
    stack?: string;
}

interface RuntimeErrorAlertProps {
    error: RuntimeError | null;
    onDismiss: () => void;
    onFix: (error: RuntimeError) => void;
}

export function RuntimeErrorAlert({ error, onDismiss, onFix }: RuntimeErrorAlertProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!error) return null;

    return (
        <div className="absolute bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="w-[400px] bg-[#1e1e20] border border-red-500/20 rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-red-500/10 border-b border-red-500/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white">Issues Detected</h3>
                            <p className="text-xs text-red-400">1 error found</p>
                        </div>
                    </div>
                    <button
                        onClick={onDismiss}
                        className="text-zinc-400 hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    <div
                        className="group cursor-pointer"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div className="flex items-start gap-2 text-zinc-300">
                            {isExpanded ? (
                                <ChevronDown className="w-4 h-4 mt-0.5 text-zinc-500" />
                            ) : (
                                <ChevronRight className="w-4 h-4 mt-0.5 text-zinc-500" />
                            )}
                            <div className="flex-1 overflow-hidden">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/10">
                                        {error.source || "Runtime Error"}
                                    </span>
                                    {error.filename && (
                                        <span className="text-xs text-zinc-500 truncate max-w-[200px]" title={error.filename}>
                                            on {error.filename.split('/').pop()}
                                        </span>
                                    )}
                                </div>
                                <p className={cn("text-xs font-mono text-zinc-300 break-words leading-relaxed", !isExpanded && "line-clamp-2")}>
                                    {error.message}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stack Trace (Expanded) */}
                    {isExpanded && error.stack && (
                        <div className="mt-4 pl-6">
                            <div className="p-3 bg-black/30 rounded-lg border border-zinc-800/50">
                                <pre className="text-[10px] text-zinc-500 whitespace-pre-wrap font-mono overflow-auto max-h-[200px]">
                                    {error.stack}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 bg-[#27272a] flex items-center justify-between border-t border-zinc-800">
                    <div className="flex items-center gap-3 text-xs text-zinc-500 px-2">
                        <button onClick={onDismiss} className="hover:text-zinc-300 transition-colors">
                            Dismiss
                        </button>
                        <span>ESC</span>
                    </div>
                    <Button
                        size="sm"
                        onClick={() => onFix(error)}
                        className="bg-blue-600 hover:bg-blue-500 text-white border-none h-8 px-4 text-xs font-medium gap-2 shadow-lg shadow-blue-900/20"
                    >
                        <Wrench className="w-3.5 h-3.5" />
                        Fix issues
                        <kbd className="hidden sm:inline-flex h-4 items-center gap-1 rounded border border-blue-400/30 bg-blue-500/20 px-1 font-mono text-[9px] font-medium text-blue-100 opacity-100">
                            F
                        </kbd>
                    </Button>
                </div>
            </div>
        </div>
    );
}
