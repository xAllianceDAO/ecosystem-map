import { Config } from '@/config/general.tsx';
import { faCamera, faChevronRight, faCircleNotch, faCog, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toPng } from 'html-to-image';
import moment from 'moment/moment';
import { useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { UAParser } from 'ua-parser-js';

export function FormCallToAction() {
    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isExportingScreenshot, setisExportingScreenshot] = useState(false);
    const { browser } = UAParser();

    const handleExportPNG = () => {
        setisExportingScreenshot(true);

        toPng(document.body, {
            skipFonts: browser.is('firefox'),
            filter: (node: HTMLElement) => {
                return node !== menuRef.current;
            },
        })
            .then((dataUrl) => {
                const fileName = `xalliance-ecosystem-map-${moment().format('YYYYMMDD')}`;
                const link = document.createElement('a');
                link.download = `${fileName}.png`;
                link.href = dataUrl;
                link.click();
            })
            .catch((error) => {
                console.error('Screenshot failed:', error);
                alert('An error occurred during the screenshot. Please try again.');
            })
            .finally(() => {
                setisExportingScreenshot(false);
            });
    };

    return (
        <Row
            ref={menuRef}
            id={'form-cta'}
            className={`g-0 align-items-start text-secondary position-fixed z-1 ${isOpen && 'active'}`}
        >
            <Col
                xs={'auto'}
                className={'bg-primary rounded-start px-2 fs-1 pointer-cursor'}
                onClick={() => setIsOpen(!isOpen)}
            >
                <FontAwesomeIcon icon={isOpen ? faChevronRight : faCog} fixedWidth />
            </Col>
            <Col className={'bg-primary p-3 rounded rounded-top-0 rounded-end-0'} style={{ width: '300px' }}>
                <Row className={'gy-3 d-inline-flex'}>
                    <Col xs={12} className={'d-grid'}>
                        <a className={'btn btn-outline-dark'} href={Config.requestForm} target={'_blank'}>
                            <FontAwesomeIcon icon={faPencil} className="me-2" />
                            Submit an update
                        </a>
                    </Col>
                    <Col xs={12} className={'d-grid'}>
                        <button className={'btn btn-outline-dark'} onClick={handleExportPNG}>
                            <FontAwesomeIcon
                                icon={isExportingScreenshot ? faCircleNotch : faCamera}
                                spin={isExportingScreenshot}
                                className={'me-2'}
                            />
                            Take a screenshot
                        </button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
