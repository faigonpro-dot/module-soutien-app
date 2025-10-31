import React from 'react';
import { Module as ModuleType } from '../types';

interface ModuleProps {
    module: ModuleType;
    sourceCellId: string;
    isSelected: boolean;
    onSelect: (moduleId: string | null, sourceCellId: string) => void;
}

const Module: React.FC<ModuleProps> = ({ module, sourceCellId, isSelected, onSelect }) => {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('moduleId', module.id);
        e.dataTransfer.setData('sourceCellId', sourceCellId);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); // Prevent calendar cell click events
        onSelect(isSelected ? null : module.id, sourceCellId);
    };
    
    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onClick={handleClick}
            className={`p-2.5 rounded-md text-white cursor-grab shadow-md flex flex-col gap-1 ${module.color} ${isSelected ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-sky-400' : ''}`}
        >
            <strong className="block text-sm truncate font-bold">{module.name}</strong>
            
            {module.description && <p className="text-xs text-white/80 font-normal truncate">{module.description}</p>}
            
            <div className="text-xs text-white/90 font-medium mt-1 space-y-1">
                {module.speakers && (
                    <div className="flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <span className="truncate">{module.speakers}</span>
                    </div>
                )}
                {module.maxStudents && (
                    <div className="flex items-center gap-1.5">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        <span className="truncate">{module.maxStudents} élèves max</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Module;
