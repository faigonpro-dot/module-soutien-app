import React, { useState } from 'react';
import { Module as ModuleType } from '../types';
import Module from './Module';

interface ModulePaletteProps {
    cellId: string;
    moduleIds: string[];
    modules: Record<string, ModuleType>;
    onDrop: (moduleId: string, sourceCellId: string, targetCellId: string) => void;
    selectedModuleId: string | null;
    onSelectModule: (moduleId: string | null, cellId: string) => void;
}

const ModulePalette: React.FC<ModulePaletteProps> = ({ cellId, moduleIds, modules, onDrop, selectedModuleId, onSelectModule }) => {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        const moduleId = e.dataTransfer.getData('moduleId');
        const sourceCellId = e.dataTransfer.getData('sourceCellId');
        onDrop(moduleId, sourceCellId, cellId);
    };

    return (
        <div className="flex-1 flex flex-col">
            <h2 className="text-lg font-semibold mb-3">Modules disponibles</h2>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`flex-1 p-3 bg-gray-900/50 rounded-lg border-2 border-dashed ${isDragOver ? 'border-sky-500' : 'border-gray-600'} transition-colors duration-200`}
            >
                <div className="flex flex-wrap gap-2">
                    {moduleIds.map(id => (
                        <Module
                            key={id}
                            module={modules[id]}
                            sourceCellId={cellId}
                            isSelected={selectedModuleId === id}
                            onSelect={(moduleId) => onSelectModule(moduleId, cellId)}
                        />
                    ))}
                     {moduleIds.length === 0 && (
                        <p className="text-gray-400 text-sm w-full text-center py-4">Créez un module pour commencer.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModulePalette;
