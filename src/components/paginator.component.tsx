export type PaginatorProps = {
    from?: number,
    to?: number,
    total?: number,
    onNext?: () => void,
    onPrevious?: () => void,
    hasPrevious?: boolean,
    hasNext?: boolean
}

export const Paginator = ({ from, to, total, onNext, onPrevious, hasPrevious, hasNext }: PaginatorProps) => {
    return (
        <>
            <div className="flex items-center border justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={onPrevious}
                        disabled={!hasPrevious}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >Anterior</button>
                    <button
                        onClick={onNext}
                        disabled={!hasNext}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >Siguiente</button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    {(total && total > 0) &&
                        <div>
                            <p className="text-sm text-gray-700">
                                Mostrando
                                <span className="font-medium"> {from} </span>
                                al
                                <span className="font-medium"> {to} </span>
                                de
                                <span className="font-medium"> {total} </span>
                                resultados
                            </p>
                        </div>
                    }
                    <div className="flex gap-3 justify-content-center">

                        <button
                            onClick={onPrevious}
                            disabled={!hasPrevious}
                            className="flex items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
                                <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" fillRule="evenodd" />
                            </svg>
                            Anterior
                        </button>

                        <button
                            onClick={onNext}
                            disabled={!hasNext}
                            className="flex items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Siguiente
                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
                                <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
                            </svg>
                        </button>

                    </div>
                </div>
            </div>

        </>
    )
}
