import Category from '@/components/Category.tsx';
import Footer from '@/components/Footer.tsx';
import { FormCallToAction } from '@/components/FormCallToAction.tsx';
import AnimatedGalaxy from '@/components/Galaxy.tsx';
import Masonry from '@/components/Masonry';
import Search from '@/components/Search.tsx';
import { categories } from '@/config/categories.tsx';
import { SearchProvider } from '@/contexts/SearchContext.tsx';
import { MasonryInstance } from '@/types/masonry';
import { useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Logo from './components/Logo.tsx';

function App() {
    const masonry = useRef<MasonryInstance | null>(null);
    const masonryOptions = {
        transitionDuration: 0,
    };

    useEffect(() => {
        const redrawMasonry = () => {
            if (masonry.current === null) {
                return;
            }

            masonry.current.masonry.layout();
        };

        window.addEventListener('resize', redrawMasonry);

        return () => window.removeEventListener('resize', redrawMasonry);
    }, []);

    return (
        <SearchProvider>
            <Container fluid className={'position-relative z-1 p-md-5'}>
                <Row className={'align-items-center justify-content-between mb-0 mb-md-5 px-3'}>
                    <Col xs={12} sm className={'my-5 my-md-0'}>
                        <Logo />
                    </Col>
                    <Col xs={12} sm={'auto'} className={'mb-2 mb-md-0'}>
                        <Search />
                    </Col>
                </Row>
                <Masonry ref={masonry} options={masonryOptions} className={'position-relative min-vh-100'}>
                    {categories.map((category) => (
                        <Category key={category.id} category={category} />
                    ))}
                </Masonry>
            </Container>
            <Footer />
            <div className={'position-fixed z-0 top-0 end-0 bottom-0 start-0 pe-none'}>
                <AnimatedGalaxy />
            </div>
            <FormCallToAction />
        </SearchProvider>
    );
}

export default App;
