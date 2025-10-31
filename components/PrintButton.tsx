import React, { useState } from 'react';

// Declare the libraries loaded from CDN for TypeScript
declare const html2canvas: any;
declare const jspdf: any;

const DownloadButton: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getFileName = () => {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        return `planning-soutien-${formattedDate}`;
    }

    const captureCanvas = async (): Promise<HTMLCanvasElement | null> => {
        const elementToCapture = document.querySelector('.printable-area') as HTMLElement;
        if (!elementToCapture) {
            console.error('Printable area not found');
            return null;
        }

        // Create a clone of the element to avoid manipulating the live DOM.
        // This is a more robust method for capturing complex, dynamic layouts.
        const clone = elementToCapture.cloneNode(true) as HTMLElement;

        // Create a container for the clone that will be placed off-screen.
        const printContainer = document.createElement('div');
        printContainer.style.position = 'absolute';
        printContainer.style.left = '-9999px'; // Move it far off-screen to avoid any visual flicker.
        printContainer.style.top = '0px';
        printContainer.style.width = '1920px'; // Set a fixed wide width to ensure desktop 4-column layout.
        
        clone.style.margin = '0'; // Ensure the clone itself has no margin.
        
        printContainer.appendChild(clone);
        document.body.appendChild(printContainer);

        let canvas: HTMLCanvasElement | null = null;
        try {
            // Allow the browser a moment to render the cloned content.
            // This is crucial for the browser to calculate the full scrollHeight.
            await new Promise(resolve => setTimeout(resolve, 300));

            const captureWidth = 1920;
            const captureHeight = clone.scrollHeight;

            canvas = await html2canvas(clone, {
                scale: 2, // Higher scale for better quality
                useCORS: true,
                backgroundColor: '#111827', // The app's background color
                width: captureWidth,
                height: captureHeight,
                windowWidth: captureWidth,
                windowHeight: captureHeight,
            });
        } catch (error) {
            console.error("Error during html2canvas capture:", error);
        } finally {
            // Clean up by removing the print container from the DOM.
            document.body.removeChild(printContainer);
        }

        return canvas;
    };

    const handleDownloadPDF = async () => {
        setIsLoading(true);
        try {
            const canvas = await captureCanvas();
            if (canvas) {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = canvas.width;
                const imgHeight = canvas.height;

                // A3 landscape dimensions in points: 1190.55 x 841.89
                const pdfWidth = 1190.55;
                const pdfHeight = (imgHeight * pdfWidth) / imgWidth;

                const { jsPDF } = jspdf;
                const pdf = new jsPDF({
                    orientation: 'landscape',
                    unit: 'pt',
                    format: 'a3'
                });

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${getFileName()}.pdf`);
            }
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Une erreur est survenue lors de la génération du PDF.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="no-print">
            <button
                onClick={handleDownloadPDF}
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-md shadow-sm px-4 py-2 bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors duration-200 disabled:bg-indigo-800 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Génération en cours...' : 'Télécharger (PDF A3)'}
                {!isLoading && (
                     <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default DownloadButton;
