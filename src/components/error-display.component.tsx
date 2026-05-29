export type ErrorDisplayProps = {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

export const ErrorDisplay = ({ title, message, onRetry }: ErrorDisplayProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <p className="text-red-600 text-lg font-semibold">{title || 'Ha ocurrido un error'}</p>
            {message && <p className="text-gray-500 text-sm">{message}</p>}
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Reintentar
                </button>
            )}
        </div>
    )
}