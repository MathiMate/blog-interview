interface SkeletonProps {
  arrayLength: number;
}

export default function Skeleton({ arrayLength }: SkeletonProps) {
  return (
    <>
      {[...Array(arrayLength)].map((_, index) => (
        <div
          key={index}
          className={`card border max-h-[500px] ${arrayLength === 1 ? 'w-[400px]' : 'w-[300px]'} p-6 rounded-xl shadow-lg bg-gray-200 animate-pulse`}
        >
          <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-300 rounded mb-4"></div>
          <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
          <div className="flex justify-between items-center mt-4">
            <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-8 w-16 bg-gray-400 rounded"></div>
          </div>
        </div>
      ))}
    </>
  );
}
