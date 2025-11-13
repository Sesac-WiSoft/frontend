import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface ActivityHeatmapProps {
  data: { date: Date; count: number }[];
}

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  // Generate last 12 weeks of data
  const weeks = 12;
  const today = new Date();
  const cells: { date: Date; count: number }[] = [];

  for (let i = weeks * 7 - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const existing = data.find(
      (d) => d.date.toDateString() === date.toDateString()
    );
    cells.push({
      date,
      count: existing?.count || 0,
    });
  }

  // Group by weeks
  const weekGroups: { date: Date; count: number }[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weekGroups.push(cells.slice(i, i + 7));
  }

  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-gray-100 border border-gray-200';
    if (count === 1) return 'bg-blue-200 border border-blue-300';
    if (count === 2) return 'bg-blue-400 border border-blue-500';
    if (count >= 3) return 'bg-gradient-to-br from-blue-600 to-purple-600 border-0 shadow-sm';
    return 'bg-gray-100 border border-gray-200';
  };

  const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <TooltipProvider>
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex gap-1">
          {/* Day labels */}
          <div className="flex flex-col gap-1 mr-2 justify-between py-1">
            {[1, 3, 5].map((idx) => (
              <div key={idx} className="h-3 flex items-center">
                <span className="text-xs text-gray-500">{dayLabels[idx]}</span>
              </div>
            ))}
          </div>

          {/* Heatmap cells */}
          {weekGroups.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {week.map((cell, dayIdx) => (
                <Tooltip key={dayIdx}>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: (weekIdx * 7 + dayIdx) * 0.01,
                      }}
                      className={`w-3 h-3 rounded-sm ${getColorClass(
                        cell.count
                      )} cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      {cell.date.toLocaleDateString('ko-KR')}
                    </p>
                    <p className="text-xs">
                      {cell.count}개 완료
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-600">
          <span>적음</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-gray-100 border border-gray-200" />
            <div className="w-3 h-3 rounded-sm bg-blue-200 border border-blue-300" />
            <div className="w-3 h-3 rounded-sm bg-blue-400 border border-blue-500" />
            <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-blue-600 to-purple-600" />
          </div>
          <span>많음</span>
        </div>
      </div>
    </TooltipProvider>
  );
}
