
const JoditEditorLoading = () => {
  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-[#e5e7eb] bg-[#f3f4f6]/30 p-3 flex gap-2 flex-wrap">
        {/* Format buttons skeleton */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 bg-[#f3f4f6] rounded animate-pulse"
          />
        ))}
      </div>

      {/* Editor area */}
      <div className="p-6 space-y-4">
        {/* Title line */}
        <div className="h-8 bg-[#f3f4f6] rounded animate-pulse w-1/3" />

        {/* Content lines */}
        <div className="space-y-3 pt-4">
          <div className="h-4 bg-[#f3f4f6] rounded animate-pulse w-full" />
          <div className="h-4 bg-[#f3f4f6] rounded animate-pulse w-5/6" />
          <div className="h-4 bg-[#f3f4f6] rounded animate-pulse w-4/5" />
        </div>

        {/* Another paragraph */}
        <div className="space-y-3 pt-6">
          <div className="h-4 bg-[#f3f4f6] rounded animate-pulse w-full" />
          <div className="h-4 bg-[#f3f4f6] rounded animate-pulse w-full" />
          <div className="h-4 bg-[#f3f4f6] rounded animate-pulse w-3/5" />
        </div>
      </div>

      {/* Footer info */}
      <div className="border-t border-border bg-[#f3f4f6]/30 p-3 flex justify-end gap-4">
        <div className="h-4 bg-[#f3f4f6] rounded animate-pulse w-24" />
        <div className="h-4 bg-[#f3f4f6] rounded animate-pulse w-24" />
        <div className="h-4 bg-[#f3f4f6] rounded animate-pulse w-32" />
      </div>
    </div>
  )
}

export default JoditEditorLoading;