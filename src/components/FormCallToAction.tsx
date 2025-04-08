import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function FormCallToAction() {
    return (
        <a
            href={'#'}
            target={'_blank'}
            id={'form-cta'}
            className={'d-flex align-items-center bg-primary text-secondary text-decoration-none rounded-start position-fixed z-1'}
        >
            <span className={'d-inline-block px-2 fs-1'}>
                <FontAwesomeIcon icon={faPencil} />
            </span>
            <span className={'d-inline-block px-2 fs-5 fw-bold'}>
                    Submit an update
            </span>
        </a>
    );
}
