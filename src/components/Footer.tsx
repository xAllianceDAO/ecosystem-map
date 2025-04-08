import logo from '@/assets/images/xalliance-logo.svg';
import moment from 'moment/moment';
import { Col, Container, Image, Row } from 'react-bootstrap';

export default function Footer() {
    return (
        <Container fluid as={'footer'}>
            <Row className={'align-items-center text-muted small'}>
                <Col>
                    Powered by&nbsp;
                    <a
                        href={'https://xalliance.io/'}
                        target={'_blank'}
                        aria-labelledby={'Open xAlliance'}
                    >
                        <Image
                            src={logo}
                            alt={'xAlliance'}
                            title={'xAlliance'}
                            className={'align-text-top'}
                            style={{
                                maxHeight: '1em',
                            }}
                        />
                    </a>
                </Col>
                <Col className={'text-end'}>
                    Updated on {moment(BUILD_DATE).format('DD MMMM YYYY')}
                </Col>
            </Row>
        </Container>
    );
}
