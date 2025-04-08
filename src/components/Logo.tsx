import logo from '@/assets/images/multiversx-logo.svg';
import { Image } from 'react-bootstrap';

export default function Logo() {
    return (
        <h1 className={'text-center text-md-start'}>
            <Image src={logo} alt={'MultiversX'} className={'align-baseline'} />
            <div className={'position-relative'} style={{ left: '-3px' }}>
                Ecosystem&nbsp;Map
            </div>
        </h1>
    );
}
