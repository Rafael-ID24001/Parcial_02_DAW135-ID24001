
export type LoadingIndicatorProps = {
    messageLoader: string
}

export const LoadingIndicator = ({ messageLoader }: LoadingIndicatorProps) => {
    return (
        <>
            <div className="center">
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
                <p className="text-center mt-4">{messageLoader}</p>
            </div>
        </>
    )
}