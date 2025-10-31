import React, { useState } from 'react';
import { Module as ModuleType } from '../types';
import Module from './Module';

interface CalendarCellProps {
    cellId: string;
    weekNumber: number;
    moduleIds: string[];
    modules: Record<string, ModuleType>;
    onDrop: (moduleId: string, sourceCellId: string, targetCellId: string) => void;
    selectedModuleId: string | null;
    onSelectModule: (moduleId: string | null, cellId: string) => void;
}

const SPECIAL_WEEKS: { [week: number]: { text: string; color: string; textColor?: string } } = {
    // PFMP
    10: { text: 'PFMP', color: '#c7f0a6', textColor: '#1f2937' },
    11: { text: 'PFMP', color: '#c7f0a6', textColor: '#1f2937' },
    12: { text: 'PFMP', color: '#c7f0a6', textColor: '#1f2937' },
    40: { text: 'PFMP', color: '#c7f0a6', textColor: '#1f2937' },
    41: { text: 'PFMP', color: '#c7f0a6', textColor: '#1f2937' },
    42: { text: 'PFMP', color: '#c7f0a6', textColor: '#1f2937' },
    // Vacances
    43: { text: 'Vacances de la Toussaint', color: '#c7c511', textColor: '#1f2937' },
    44: { text: 'Vacances de la Toussaint', color: '#c7c511', textColor: '#1f2937' },
    52: { text: 'Vacances de Noël', color: '#c7c511', textColor: '#1f2937' },
    1: { text: 'Vacances de Noël', color: '#c7c511', textColor: '#1f2937' },
    8: { text: "Vacances d'hiver", color: '#c7c511', textColor: '#1f2937' },
    9: { text: "Vacances d'hiver", color: '#c7c511', textColor: '#1f2937' },
    16: { text: 'Vacances de printemps', color: '#c7c511', textColor: '#1f2937' },
    17: { text: 'Vacances de printemps', color: '#c7c511', textColor: '#1f2937' },
    28: { text: "Vacances d'été", color: '#c7c511', textColor: '#1f2937' },
    29: { text: "Vacances d'été", color: '#c7c511', textColor: '#1f2937' },
    30: { text: "Vacances d'été", color: '#c7c511', textColor: '#1f2937' },
    31: { text: "Vacances d'été", color: '#c7c511', textColor: '#1f2937' },
    32: { text: "Vacances d'été", color: '#c7c511', textColor: '#1f2937' },
    33: { text: "Vacances d'été", color: '#c7c511', textColor: '#1f2937' },
    34: { text: "Vacances d'été", color: '#c7c511', textColor: '#1f2937' },
    35: { text: "Vacances d'été", color: '#c7c511', textColor: '#1f2937' },
};


const CalendarCell: React.FC<CalendarCellProps> = ({ cellId, weekNumber, moduleIds, modules, onDrop, selectedModuleId, onSelectModule }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const specialWeekInfo = SPECIAL_WEEKS[weekNumber];

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        if (specialWeekInfo) return;
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        if (specialWeekInfo) return;
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if (specialWeekInfo) return;
        e.preventDefault();
        setIsDragOver(false);
        const moduleId = e.dataTransfer.getData('moduleId');
        const sourceCellId = e.dataTransfer.getData('sourceCellId');
        onDrop(moduleId, sourceCellId, cellId);
    };

    if (specialWeekInfo) {
        return (
            <div
                className="p-2 rounded-md min-h-[80px] flex-grow flex items-center justify-center text-center"
                style={{ backgroundColor: specialWeekInfo.color }}
            >
                <span className="text-sm font-bold" style={{ color: specialWeekInfo.textColor || '#1f2937' }}>
                    {specialWeekInfo.text}
                </span>
            </div>
        );
    }

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`p-2 rounded-md transition-colors duration-300 min-h-[80px] flex-grow ${isDragOver ? 'bg-sky-900/50' : 'bg-gray-700/50'}`}
        >
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-400">S{weekNumber}</span>
            </div>
            <div className="flex flex-col gap-1">
                {moduleIds.map((id, index) => modules[id] && (
                     <Module
                        key={`${id}-${index}`}
                        module={modules[id]}
                        sourceCellId={cellId}
                        isSelected={selectedModuleId === id}
                        onSelect={(moduleId) => onSelectModule(moduleId, cellId)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CalendarCell;
