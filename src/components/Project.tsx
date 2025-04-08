import { ProjectType } from '@/types/project';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';

type ProjectProps = {
    project: ProjectType,
}

export default function Project({ project }: ProjectProps) {
    return (
        <OverlayTrigger
            placement={'bottom'}
            offset={[0, 16]}
            overlay={
                <Tooltip>
                    {project.name}
                </Tooltip>
            }
        >
            <a
                href={project.url ?? '#'}
                target={'_blank'}
                aria-label={`Open ${project.name}`}
            >
                {project.icon
                    //? <Image src={`/logos/${project.icon}`} alt={project.name} />
                    ? <Image src={project.icon} alt={project.name} />
                    : project.name
                }
            </a>
        </OverlayTrigger>
    );
}
