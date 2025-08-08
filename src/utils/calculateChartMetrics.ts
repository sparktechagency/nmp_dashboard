import type { TJobYear } from "../types/year.type"

// Helper function to calculate dynamic domain and ticks
const calculateChartMetrics = (data: TJobYear[]) => {
  const maxValue = Math.max(...data.map((item) => item.jobs))

  // Add 20% padding to the max value and round up to nearest 100
  const paddedMax = Math.ceil((maxValue * 1.2) / 100) * 100

  // Ensure minimum domain of 100
  const domainMax = Math.max(paddedMax, 100)

  // Generate 5-6 evenly spaced ticks
  const tickCount = 5
  const tickInterval = Math.ceil(domainMax / tickCount / 50) * 50 // Round to nearest 50

  const ticks = []
  for (let i = 0; i <= domainMax; i += tickInterval) {
    ticks.push(i)
  }

  // Ensure the last tick matches the domain max
  if (ticks[ticks.length - 1] !== domainMax) {
    ticks[ticks.length - 1] = domainMax
  }

  return {
    domain: [0, domainMax],
    ticks,
  }
}

export default calculateChartMetrics;