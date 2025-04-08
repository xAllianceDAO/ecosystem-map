import Project from '@/components/Project.tsx';
import { projects } from '@/config/projects.tsx';
import { Card, Col, Row } from 'react-bootstrap';

export default function OfficialCategory() {
    return (
        <Card>
            <Card.Body className={'official-projects'}>
                <Row className={'align-items-center g-4'}>
                    {projects
                        .filter((project) => project.category === 'official')
                        .map((project, index) => (
                            <Col key={index} xs={'auto'}>
                                <Project project={project} />
                            </Col>
                        ))
                    }
                </Row>
            </Card.Body>
        </Card>
    );
}
