import { Config } from '@/config/general.tsx';
import { faCamera, faBars, faImage, faFont, faSpinner, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import moment from 'moment';

interface FormCallToActionProps {
    onToggleLogos: () => void;
    onToggleAnimation: () => void;
    showLogos: boolean;
    showAnimation: boolean;
    isToggleLogosLoading?: boolean;
}

export function FormCallToAction({ 
    onToggleLogos, 
    onToggleAnimation, 
    showLogos, 
    showAnimation, 
    isToggleLogosLoading = false 
}: FormCallToActionProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleExportPNG = async () => {
        setIsExporting(true);
        try {
            // Temporarily hide the menu for capture
            if (menuRef.current) {
                menuRef.current.style.display = 'none';
            }

            const element = document.body;
            const scrollY = window.scrollY;
            
            // Save original dimensions
            const originalWidth = element.style.width;
            const originalHeight = element.style.height;
            const originalPosition = element.style.position;
            const originalTop = element.style.top;

            // Adjust the body for complete capture
            element.style.width = '100%';
            element.style.height = 'auto';
            element.style.position = 'relative';
            element.style.top = `-${scrollY}px`;

            // Wait for all images to load
            const images = Array.from(element.getElementsByTagName('img'));
            await Promise.all(images.map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                });
            }));

            // Set crossOrigin on all images
            images.forEach((img: HTMLImageElement) => {
                img.crossOrigin = 'anonymous';
            });

            const canvas = await html2canvas(element, {
                logging: true,
                allowTaint: true,
                useCORS: true,
                height: Math.max(
                    element.scrollHeight,
                    element.offsetHeight,
                    element.clientHeight
                )
            });
            
            // Restore original dimensions
            element.style.width = originalWidth;
            element.style.height = originalHeight;
            element.style.position = originalPosition;
            element.style.top = originalTop;

            // Restore menu display
            if (menuRef.current) {
                menuRef.current.style.display = '';
            }

            const fileName = `xAlliance - Ecosystem Map - ${moment().format('YYYY-MM-DD HH:mm')}`;
            const link = document.createElement('a');
            link.download = `${fileName}.png`;
            link.href = canvas.toDataURL('image/png', 1.0); // Maximum quality
            link.click();
        } catch (error) {
            console.error('Export failed:', error);
            alert('An error occurred during export. Please try again.');
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
                    onClick={isExporting ? undefined : handleExportPNG}
                    style={{ opacity: isExporting ? 0.5 : 1 }}
                >
                    <FontAwesomeIcon icon={isExporting ? faSpinner : faCamera} className={isExporting ? 'fa-spin' : ''} />
                    <span>Export as PNG</span>
                </div>

                <div 
                    className={'control-item'} 
                    onClick={isToggleLogosLoading ? undefined : onToggleLogos}
                    style={{ opacity: isToggleLogosLoading ? 0.5 : 1 }}
                >
                    <FontAwesomeIcon icon={isToggleLogosLoading ? faSpinner : (showLogos ? faImage : faFont)} className={isToggleLogosLoading ? 'fa-spin' : ''} />
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
