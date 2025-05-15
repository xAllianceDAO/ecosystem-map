import Project from '@/components/Project.tsx';
import { projects } from '@/config/projects.tsx';
import { CategoryType } from '@/types/project';
import { useMemo, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { motion } from 'framer-motion';

type CategoryProps = {
    category: CategoryType;
    showLogo: boolean;
    index?: number;
}

const getRandomDirection = () => {
    const directions = [
        { x: -100, y: 0 },    // left
        { x: 100, y: 0 },     // right
        { x: 0, y: -100 },    // top
        { x: 0, y: 100 },     // bottom
        { x: -100, y: -100 }, // top-left
        { x: 100, y: -100 },  // top-right
        { x: -100, y: 100 },  // bottom-left
        { x: 100, y: 100 }    // bottom-right
    ];
    return directions[Math.floor(Math.random() * directions.length)];
};

// Function to create a shuffled array of indices
const getShuffledIndices = (length: number) => {
    const indices = Array.from({ length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
};

export default function Category({ category, showLogo, index = 0 }: CategoryProps) {
    const categoryProjects = useMemo(() => projects.filter(project => project.category === category.id), [category.id]);
    const [isInPlace, setIsInPlace] = useState(false);
    const shuffledIndices = useMemo(() => getShuffledIndices(categoryProjects.length), [categoryProjects.length]);
    let sizes = 'w-100 w-md-50 w-lg-33';

    if (category.id === 'staking') {
        sizes = 'w-100';
    }

    const direction = useMemo(() => getRandomDirection(), []);

    return (
        <motion.div 
            className={`position-absolute pb-4 p-md-3 ${sizes}`}
            initial={{ 
                opacity: 0,
                x: direction.x,
                y: direction.y,
                scale: 0.8
            }}
            animate={{ 
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1
            }}
            transition={{ 
                type: "spring",
                duration: 0.8,
                bounce: 0.3,
                delay: index * 0.4
            }}
            onAnimationComplete={() => setIsInPlace(true)}
        >
            <Card>
                <Card.Header className={'fs-5'}>
                    {category.name}
                </Card.Header>
                <Card.Body className={'projects'}>
                    <Row className={'justify-content-center align-items-center g-4'}>
                        {categoryProjects.map((project, projectIndex) => (
                            <Col key={projectIndex} xs={'auto'}>
                                <Project 
                                    project={project} 
                                    showLogo={showLogo} 
                                    canAnimate={isInPlace} 
                                    projectIndex={shuffledIndices[projectIndex]}
                                    totalProjects={categoryProjects.length}
                                />
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </motion.div>
    );
}
