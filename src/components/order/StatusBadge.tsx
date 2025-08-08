import type { TDeliveryStatus } from "../../types/order.type"


const StatusBadge = ({ status }: { status: TDeliveryStatus }) => {
  const statusConfig = {
    processing: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-300",
      dot: "bg-blue-500",
    },
    shipped: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-300",
      dot: "bg-yellow-500",
    },
    delivered: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-300",
      dot: "bg-green-500",
    },
    cancelled: {
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-300",
      dot: "bg-red-500",
    },
  }

  const config = statusConfig[status]

  return (
      <div
        className={`${config.bg} ${config.text} ${config.border} 
          flex items-center gap-2 px-3 py-1.5 w-28 text-sm font-medium 
          rounded-full border transition-all duration-200 hover:shadow-sm
          min-w-[100px] justify-center`}
      >
        <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
        <span className="capitalize">{status}</span>
      </div>
  )
}


export default StatusBadge;