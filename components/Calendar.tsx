import React from 'react';
import { Module as ModuleType } from '../types';
import { CALENDAR_STRUCTURE } from '../constants';
import CalendarCell from './CalendarCell';

interface CalendarProps {
    calendarState: Record<string, string[]>;
    modules: Record<string, ModuleType>;
    onDrop: (moduleId: string, sourceCellId: string, targetCellId: string) => void;
    selectedModuleId: string | null;
    onSelectModule: (moduleId: string | null, cellId: string) => void;
}

// Group months by their display column as seen in the target layout
const COLUMN_LAYOUT = [
    ['Septembre', 'Janvier', 'Mai'],
    ['Octobre', 'Février', 'Juin'],
    ['Novembre', 'Mars', 'Juillet'],
    ['Décembre', 'Avril', 'Août'],
];

// Create a lookup for month data by name for easier access
const CALENDAR_DATA_BY_NAME = CALENDAR_STRUCTURE.reduce((acc, monthData) => {
    acc[monthData.month] = monthData;
    return acc;
}, {} as Record<string, { month: string; weeks: number[] }>);

const Calendar: React.FC<CalendarProps> = ({ calendarState, modules, onDrop, selectedModuleId, onSelectModule }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {COLUMN_LAYOUT.map((column, colIndex) => (
                <div key={`col-${colIndex}`} className="flex flex-col gap-4">
                    {column.map(monthName => {
                        const monthData = CALENDAR_DATA_BY_NAME[monthName];
                        if (!monthData) return null;

                        const { month, weeks } = monthData;
                        
                        const weekCells = weeks.map(week => {
                            const cellId = `${month}-${week}`;
                            return (
                                <CalendarCell
                                    key={cellId}
                                    cellId={cellId}
                                    weekNumber={week}
                                    moduleIds={calendarState[cellId] || []}
                                    modules={modules}
                                    onDrop={onDrop}
                                    selectedModuleId={selectedModuleId}
                                    onSelectModule={onSelectModule}
                                />
                            );
                        });

                        return (
                            <div key={month} className="bg-gray-800 p-3 rounded-lg flex flex-col gap-2">
                                <h2 className="text-xl font-bold text-center text-sky-400 mb-2">{month}</h2>
                                {weekCells}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Calendar;
