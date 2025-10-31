
import React, { useState } from 'react';
import { PALETTE_COLORS } from '../constants';

interface CreateModuleFormProps {
    onCreate: (data: { name: string; description: string; speakers: string; maxStudents: string; color: string }) => void;
}

const CreateModuleForm: React.FC<CreateModuleFormProps> = ({ onCreate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [speakers, setSpeakers] = useState('');
    const [maxStudents, setMaxStudents] = useState('');
    const [selectedColor, setSelectedColor] = useState(PALETTE_COLORS[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onCreate({ name, description, speakers, maxStudents, color: selectedColor });
            setName('');
            setDescription('');
            setSpeakers('');
            setMaxStudents('');
        }
    };
    
    const inputClasses = "w-full px-3 py-2 text-white bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500";
    const labelClasses = "block text-sm font-medium text-gray-300 mb-1";

    return (
        <div className="p-4 bg-gray-700/50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Créer un module</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="module-name" className={labelClasses}>NOM DU MODULE :</label>
                    <input
                        id="module-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Introduction à React"
                        className={inputClasses}
                        required
                    />
                </div>
                 <div>
                    <label htmlFor="module-desc" className={labelClasses}>Description sommaire :</label>
                    <textarea
                        id="module-desc"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Contenu du cours..."
                        rows={2}
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="module-speakers" className={labelClasses}>Intervenant(s) :</label>
                    <input
                        id="module-speakers"
                        type="text"
                        value={speakers}
                        onChange={(e) => setSpeakers(e.target.value)}
                        placeholder="Ex: Jean Dupont"
                        className={inputClasses}
                    />
                </div>
                 <div>
                    <label htmlFor="module-students" className={labelClasses}>Nombre élèves max :</label>
                    <input
                        id="module-students"
                        type="number"
                        value={maxStudents}
                        onChange={(e) => setMaxStudents(e.target.value)}
                        placeholder="Ex: 25"
                        className={inputClasses}
                    />
                </div>

                <div className="grid grid-cols-6 gap-2 pt-2">
                    {PALETTE_COLORS.map(color => (
                        <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`h-8 w-full rounded ${color} transition-transform duration-150 ${selectedColor === color ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white scale-110' : 'hover:scale-110'}`}
                            aria-label={`Select color ${color}`}
                        />
                    ))}
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 font-bold text-white bg-sky-600 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500 transition-colors duration-200"
                >
                    Générer le Module
                </button>
            </form>
        </div>
    );
};

export default CreateModuleForm;
