import Project from '@/components/Project.tsx';
import { projects } from '@/config/projects.tsx';
import { CategoryType } from '@/types/project';
import { useMemo } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

type CategoryProps = {
    category: CategoryType,
}

export default function Category({ category }: CategoryProps) {
    const categoryProjects = useMemo(() => {
        return projects
            .filter(project => project.category === category.id)
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [category.id]);
    let sizes = 'w-100 w-md-50 w-lg-33';

    if (category.id === 'staking') {
        sizes = 'w-100';
    }

    return (
        <div className={`position-absolute pb-4 p-md-3 ${sizes}`}>
            <Card>
                <Card.Header className={'fs-5'}>
                    {category.name}
                </Card.Header>
                <Card.Body className={'projects'}>
                    <Row className={'justify-content-center align-items-center g-4'}>
                        {categoryProjects.map((project, index) => (
                            <Col key={index} xs={'auto'}>
                                <Project project={project} />
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}
