import { Config } from '@/config/general.tsx';
import { faCamera, faBars, faImage, faFont, faSpinner, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import moment from 'moment';
import './FormCallToAction.scss';

interface FormCallToActionProps {
    onToggleLogos: () => void;
    onToggleAnimation: () => void;
    showLogos: boolean;
    showAnimation: boolean;
}

export function FormCallToAction({ onToggleLogos, onToggleAnimation, showLogos, showAnimation }: FormCallToActionProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleExportPNG = async () => {
        setIsExporting(true);
        try {
            // Cacher temporairement le menu pour la capture
            if (menuRef.current) {
                menuRef.current.style.display = 'none';
            }

            const element = document.body;
            const scrollY = window.scrollY;
            
            // Sauvegarder les dimensions originales
            const originalWidth = element.style.width;
            const originalHeight = element.style.height;
            const originalPosition = element.style.position;
            const originalTop = element.style.top;

            // Ajuster le body pour la capture complète
            element.style.width = '100%';
            element.style.height = 'auto';
            element.style.position = 'relative';
            element.style.top = `-${scrollY}px`;

            const canvas = await html2canvas(element, {
                logging: false,
                allowTaint: true,
                useCORS: true,
                height: Math.max(
                    element.scrollHeight,
                    element.offsetHeight,
                    element.clientHeight
                )
            });
            
            // Restaurer les dimensions originales
            element.style.width = originalWidth;
            element.style.height = originalHeight;
            element.style.position = originalPosition;
            element.style.top = originalTop;

            // Restaurer l'affichage du menu
            if (menuRef.current) {
                menuRef.current.style.display = '';
            }

            const fileName = `xAlliance - Ecosystem Map - ${moment().format('YYYY-MM-DD HH:mm')}`;
            const link = document.createElement('a');
            link.download = `${fileName}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error('Export failed:', error);
        }
        setIsExporting(false);
    };

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            id={'form-cta'}
            ref={menuRef}
            className={`bg-primary text-secondary ${isOpen ? 'active' : ''}`}
        >
            <div 
                className={'control-icon'}
                onClick={togglePanel}
            >
                <FontAwesomeIcon icon={faBars} />
            </div>

            <div className={'controls-panel'}>
                <div className={'control-item'}>
                    <a
                        href={Config.requestForm}
                        target={'_blank'}
                        className={'text-decoration-none'}
                    >
                        <FontAwesomeIcon icon={faPencil} />
                        <span>Submit an update</span>
                    </a>
                </div>

                <div 
                    className={'control-item'} 
                    onClick={handleExportPNG}
                >
                    <FontAwesomeIcon icon={isExporting ? faSpinner : faCamera} className={isExporting ? 'fa-spin' : ''} />
                    <span>Export as PNG</span>
                </div>

                <div 
                    className={'control-item'} 
                    onClick={onToggleLogos}
                >
                    <FontAwesomeIcon icon={showLogos ? faImage : faFont} />
                    <span>{showLogos ? 'Show Names' : 'Show Logos'}</span>
                </div>

                <div 
                    className={'control-item'} 
                    onClick={onToggleAnimation}
                >
                    <FontAwesomeIcon icon={faSpinner} />
                    <span>{showAnimation ? 'Disable Animation' : 'Enable Animation'}</span>
                </div>
            </div>
        </div>
    );
}
