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
            // Cacher temporairement le menu et les contrôles pour la capture
            if (menuRef.current) {
                menuRef.current.style.display = 'none';
            }
            const controlsPanel = document.querySelector('.controls-panel');
            if (controlsPanel) {
                (controlsPanel as HTMLElement).style.display = 'none';
            }

            const element = document.body;
            
            // Sauvegarder les styles originaux
            const originalStyles = {
                width: element.style.width,
                height: element.style.height,
                position: element.style.position,
                transform: element.style.transform,
                transformOrigin: element.style.transformOrigin,
                overflow: element.style.overflow,
                margin: element.style.margin,
                padding: element.style.padding,
                backgroundColor: element.style.backgroundColor
            };

            // Sauvegarder le viewport meta original
            const viewportMeta = document.querySelector('meta[name="viewport"]');
            const originalViewportContent = viewportMeta?.getAttribute('content');

            // Dimensions cibles
            const targetWidth = 1920;
            const targetHeight = 1770;

            // Forcer la vue desktop
            if (viewportMeta) {
                viewportMeta.setAttribute('content', `width=${targetWidth}`);
            }

            // Ajuster le body pour la capture
            element.style.width = `${targetWidth}px`;
            element.style.height = `${targetHeight}px`;
            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.style.margin = '0';
            element.style.padding = '0';
            element.style.backgroundColor = '#000000';

            // Calculer et appliquer l'échelle pour l'affichage correct
            const scaleX = window.innerWidth / targetWidth;
            const scaleY = window.innerHeight / targetHeight;
            const scale = Math.min(scaleX, scaleY);
            
            if (scale < 1) {
                element.style.transform = `scale(${scale})`;
                element.style.transformOrigin = 'top left';
            }

            // Attendre que les changements soient appliqués
            await new Promise(resolve => setTimeout(resolve, 300));

            // Faire la capture avec les dimensions originales
            const canvas = await html2canvas(element, {
                logging: false,
                allowTaint: true,
                useCORS: true,
                width: targetWidth,
                height: targetHeight
            });
            
            // Restaurer les styles originaux
            Object.entries(originalStyles).forEach(([property, value]) => {
                (element.style as any)[property] = value;
            });

            // Restaurer le viewport original
            if (viewportMeta && originalViewportContent) {
                viewportMeta.setAttribute('content', originalViewportContent);
            }

            // Restaurer l'affichage des éléments cachés
            if (menuRef.current) {
                menuRef.current.style.display = '';
            }
            if (controlsPanel) {
                (controlsPanel as HTMLElement).style.display = '';
            }

            // Créer un nouveau canvas avec les dimensions exactes
            const finalCanvas = document.createElement('canvas');
            finalCanvas.width = targetWidth;
            finalCanvas.height = targetHeight;
            const ctx = finalCanvas.getContext('2d');
            
            if (ctx) {
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, targetWidth, targetHeight);
                
                // Calculer les dimensions pour centrer l'image
                const scale = Math.min(
                    targetWidth / canvas.width,
                    targetHeight / canvas.height
                );
                
                const scaledWidth = canvas.width * scale;
                const scaledHeight = canvas.height * scale;
                const x = (targetWidth - scaledWidth) / 2;
                const y = (targetHeight - scaledHeight) / 2;

                ctx.drawImage(
                    canvas,
                    x, y, scaledWidth, scaledHeight
                );
            }

            const fileName = `xAlliance - Ecosystem Map - ${moment().format('YYYY-MM-DD HH:mm')}`;
            const link = document.createElement('a');
            link.download = `${fileName}.png`;
            link.href = finalCanvas.toDataURL('image/png', 1.0);
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
