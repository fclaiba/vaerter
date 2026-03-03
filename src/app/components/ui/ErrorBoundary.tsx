import React, { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error("Uncaught error in Dashboard component:", error, errorInfo);
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: undefined });
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                    <div className="rounded-full bg-red-500/10 p-4 mb-4 border border-red-500/20">
                        <AlertTriangle className="w-8 h-8 text-red-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-zinc-100 mb-2">
                        Ups, algo salió mal en este módulo
                    </h2>
                    <p className="text-zinc-400 text-sm max-w-md mb-6">
                        Ha ocurrido un error inesperado al cargar esta sección del dashboard.
                        El resto de la aplicación funciona correctamente.
                    </p>

                    <div className="bg-zinc-900/50 border border-white/5 rounded-lg p-4 mb-6 text-left max-w-lg w-full overflow-auto max-h-32">
                        <p className="text-xs font-mono text-red-300 whitespace-pre-wrap">
                            {this.state.error?.message || "Error desconocido"}
                        </p>
                    </div>

                    <button
                        onClick={this.handleReset}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white transition-colors"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Recargar aplicación
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
