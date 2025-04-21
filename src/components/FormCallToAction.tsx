import { Config } from '@/config/general.tsx';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

export function FormCallToAction() {
    const link = useRef<HTMLDivElement>(null);

    return (
        <div
            id={'form-cta'}
            ref={link}
            className={'d-flex align-items-center bg-primary text-secondary rounded-start position-fixed z-1 pointer-cursor'}
            onClick={() => {
                link.current?.classList.toggle('active');
            }}
        >
            <span className={'d-inline-block px-2 fs-1'}>
                <FontAwesomeIcon icon={faPencil} />
            </span>
            <a
                href={Config.requestForm}
                target={'_blank'}
                className={'d-inline-block px-2 fs-5 fw-bold text-secondary text-decoration-none'}
            >
                Submit an update
            </a>
        </div>
    );
}
