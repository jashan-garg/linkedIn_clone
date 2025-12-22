export default function PostSkeleton() {
    return (
        <div className="bg-white border rounded-lg shadow-sm p-4 space-y-4 animate-pulse">
            <div className="flex gap-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
            </div>

            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>

            <div className="h-56 bg-gray-200 rounded"></div>
        </div>
    );
}
