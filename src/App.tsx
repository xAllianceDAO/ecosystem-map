import Category from '@/components/Category.tsx';
import Footer from '@/components/Footer.tsx';
import { FormCallToAction } from '@/components/FormCallToAction.tsx';
import AnimatedGalaxy from '@/components/Galaxy.tsx';
import Masonry from '@/components/Masonry';
import OfficialCategory from '@/components/OfficialCategory.tsx';
import Stats from '@/components/Stats.tsx';
import { categories } from '@/config/categories.tsx';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';
import { MasonryInstance } from '@/types/masonry';
import { useEffect, useRef, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Logo from './components/Logo.tsx';

function App() {
    const masonry = useRef<MasonryInstance | null>(null);
    const [showLogos, setShowLogos] = useState(true);
    const { isDesktop } = useDeviceDetection();
    const [showAnimation, setShowAnimation] = useState(() => isDesktop);
    const [isToggleLogosLoading, setIsToggleLogosLoading] = useState(false);
    
    const masonryOptions = {
        transitionDuration: 0,
    };

    // Function to redraw masonry layout
    const redrawMasonry = () => {
        if (masonry.current === null) {
            return;
        }
        masonry.current.masonry.layout();
    };

    useEffect(() => {
        window.addEventListener('resize', redrawMasonry);
        return () => window.removeEventListener('resize', redrawMasonry);
    }, []);

    // Redraw masonry when all images are loaded
    useEffect(() => {
        const handleAllImagesLoaded = () => {
            // Wait for all images to load or fail
            const images = document.querySelectorAll('.project-logo');
            let loadedCount = 0;
            const totalImages = images.length;

            if (totalImages === 0) {
                redrawMasonry();
                setIsToggleLogosLoading(false);
                return;
            }

            const imageLoaded = () => {
                loadedCount++;
                if (loadedCount >= totalImages) {
                    // All images have loaded or failed
                    redrawMasonry();
                    setIsToggleLogosLoading(false);
                }
            };

            images.forEach((img) => {
                const imgElement = img as HTMLImageElement;
                if (imgElement.complete) {
                    imageLoaded();
                } else {
                    imgElement.addEventListener('load', imageLoaded);
                    imgElement.addEventListener('error', imageLoaded);
                }
            });
        };

        // Set multiple timers for layout refresh
        if (showLogos) {
            // Initial layout
            setTimeout(redrawMasonry, 100);
            // Check when images load
            setTimeout(handleAllImagesLoaded, 200);
            // Safety fallback for final layout
            setTimeout(() => {
                redrawMasonry();
                setIsToggleLogosLoading(false);
            }, 1500);
        } else {
            // For text mode, simple timeout is enough
            setTimeout(() => {
                redrawMasonry();
                setIsToggleLogosLoading(false);
            }, 100);
        }
    }, [showLogos]);

    const handleToggleLogos = () => {
        setIsToggleLogosLoading(true);
        setShowLogos(!showLogos);
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
                
                {isToggleLogosLoading && (
                    <div className="position-fixed top-50 start-50 translate-middle">
                        <Spinner animation="border" role="status" className="text-primary" style={{ width: '3rem', height: '3rem' }}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                )}
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
                isToggleLogosLoading={isToggleLogosLoading}
            />
        </>
    );
}

export default App;
