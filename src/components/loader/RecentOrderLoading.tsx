
const RecentOrderLoading = () => {
    const loadingArray = [1, 2, 3, 4, 5];

    return (
        <>
            <div className="bg-white p-3 mt-3 shadow-md rounded-md">
                <div className="flex items-center justify-between mb-8">
                    <div className="h-7 w-40 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-9 w-20 bg-gray-200 rounded border animate-pulse"></div>
                </div>
                <div className="flex flex-col gap-6 animate-pulse">
                    {loadingArray?.map((item) => (
                        <div
                            key={item}
                            className="bg-gray-300 h-[40px]  text-white font-bold py-2 px-4 rounded-md"
                        ></div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RecentOrderLoading;