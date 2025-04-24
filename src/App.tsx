import Category from '@/components/Category.tsx';
import Footer from '@/components/Footer.tsx';
import { FormCallToAction } from '@/components/FormCallToAction.tsx';
import AnimatedGalaxy from '@/components/Galaxy.tsx';
import Masonry from '@/components/Masonry';
import OfficialCategory from '@/components/OfficialCategory.tsx';
import { categories } from '@/config/categories.tsx';
import { MasonryInstance } from '@/types/masonry';
import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Logo from './components/Logo.tsx';

function App() {
    const masonry = useRef<MasonryInstance | null>(null);
    const [showLogos, setShowLogos] = useState(true);
    const [showAnimation, setShowAnimation] = useState(() => {
        // Détection mobile basée sur la largeur d'écran
        const isMobile = window.innerWidth <= 768;
        return !isMobile;
    });
    
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

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 768;
            setShowAnimation(!isMobile);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleToggleLogos = () => {
        setShowLogos(!showLogos);
        // Redraw masonry after state change
        setTimeout(() => {
            masonry.current?.masonry.layout();
        }, 0);
    };

    const handleToggleAnimation = () => {
        setShowAnimation(!showAnimation);
    };

    return (
        <>
            <Container fluid className={'position-relative z-1 p-md-5'}>
                <Row className={'align-items-center mb-0 mb-md-5'}>
                    <Col xs={12} md={5} className={'my-5 my-md-0'}>
                        <Logo />
                    </Col>
                    <Col xs={12} md className={'mb-4 mb-md-0'}>
                        <OfficialCategory showLogo={showLogos} />
                    </Col>
                </Row>
                <Masonry ref={masonry} options={masonryOptions} className={'position-relative'}>
                    {categories.map((category, index) => (
                        <Category key={category.id} category={category} showLogo={showLogos} index={index} />
                    ))}
                </Masonry>
            </Container>
            <Footer />
            {showAnimation && (
                <div className={'position-fixed z-0 top-0 end-0 bottom-0 start-0 pe-none'}>
                    <AnimatedGalaxy />
                </div>
            )}
            <FormCallToAction 
                onToggleLogos={handleToggleLogos}
                onToggleAnimation={handleToggleAnimation}
                showLogos={showLogos}
                showAnimation={showAnimation}
            />
        </>
    );
}

export default App;
