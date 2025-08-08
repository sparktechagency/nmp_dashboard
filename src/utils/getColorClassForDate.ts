const bgColorMap = [
  { bg: "bg-red-100", text: "text-red-700", border: "border-red-300" },
  { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-300" },
  { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-300" },
  { bg: "bg-green-100", text: "text-green-700", border: "border-green-300" },
  { bg: "bg-teal-100", text: "text-teal-700", border: "border-teal-300" },
  { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-300" },
  { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-300" },
  { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-300" },
  { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-300" },
  { bg: "bg-neutral-100", text: "text-neutral-700", border: "border-neutral-300" },
  { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-300" },
  { bg: "bg-lime-100", text: "text-lime-700", border: "border-lime-300" },
  { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-300" },
  { bg: "bg-cyan-100", text: "text-cyan-700", border: "border-cyan-300" },
  { bg: "bg-sky-100", text: "text-sky-700", border: "border-sky-300" },
  { bg: "bg-violet-100", text: "text-violet-700", border: "border-violet-300" },
  { bg: "bg-fuchsia-100", text: "text-fuchsia-700", border: "border-fuchsia-300" },
  { bg: "bg-rose-200", text: "text-rose-800", border: "border-rose-400" },
  { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-300" },
  { bg: "bg-stone-100", text: "text-stone-700", border: "border-stone-300" },
  { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-300" },
  { bg: "bg-zinc-100", text: "text-zinc-700", border: "border-zinc-300" },
  { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-300" },
  { bg: "bg-red-200", text: "text-red-800", border: "border-red-400" },
  { bg: "bg-orange-200", text: "text-orange-800", border: "border-orange-400" },
  { bg: "bg-yellow-200", text: "text-yellow-800", border: "border-yellow-400" },
  { bg: "bg-green-200", text: "text-green-800", border: "border-green-400" },
  { bg: "bg-blue-200", text: "text-blue-800", border: "border-blue-400" },
  { bg: "bg-purple-200", text: "text-purple-800", border: "border-purple-400" },
  { bg: "bg-pink-200", text: "text-pink-800", border: "border-pink-400" },
  { bg: "bg-indigo-200", text: "text-indigo-800", border: "border-indigo-400" },
];


const getColorClassForDate = (date: string) => {
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    hash = (hash * 31 + date.charCodeAt(i)) % 2147483647; // a large prime
  }
  const index = hash % bgColorMap.length;
  return bgColorMap[index];
};

export default getColorClassForDate;