import Project from '@/components/Project.tsx';
import { projects } from '@/config/projects.tsx';
import { Card, Col, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

type OfficialCategoryProps = {
    showLogo: boolean;
}

const getShuffledIndices = (length: number) => {
    const indices = Array.from({ length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
};

export default function OfficialCategory({ showLogo }: OfficialCategoryProps) {
    const [isInPlace, setIsInPlace] = useState(false);
    const officialProjects = useMemo(() => projects.filter((project) => project.category === 'official'), []);
    const shuffledIndices = useMemo(() => getShuffledIndices(officialProjects.length), [officialProjects.length]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => setIsInPlace(true)}
        >
            <Card>
                <Card.Body className={'official-projects'}>
                    <Row className={'align-items-center g-4'}>
                        {officialProjects.map((project, index) => (
                            <Col key={index} xs={'auto'}>
                                <Project 
                                    project={project} 
                                    showLogo={showLogo} 
                                    canAnimate={isInPlace}
                                    projectIndex={shuffledIndices[index]}
                                    totalProjects={officialProjects.length}
                                />
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </motion.div>
    );
}
