import ProjectInitials from '@/components/ProjectInitials.tsx';
import { ProjectType } from '@/types/project';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './Project.scss';

type ProjectProps = {
    project: ProjectType;
    showLogo: boolean;
}

export default function Project({ project, showLogo }: ProjectProps) {
    let logo = null;

    if (project.icon && showLogo) {
        if (project.icon.startsWith('/') || project.icon?.startsWith('https://')) {
            logo = project.icon;
        } else {
            logo = `https://raw.githubusercontent.com/multiversx/mx-assets/master/accounts/icons/${project.icon}`;
        }
    }

    const content = showLogo ? (
        logo ? (
            <Image src={logo} alt={project.name} className="project-logo" />
        ) : (
            <ProjectInitials project={project} />
        )
    ) : (
        <span className="project-name px-2 py-1 rounded bg-secondary text-primary">
            {project.name}
        </span>
    );

    return (
        <OverlayTrigger
            placement={'bottom'}
            offset={[0, 16]}
            trigger={['hover']}
            overlay={
                <Tooltip>
                    {showLogo ? project.name : project.description || project.name}
                </Tooltip>
            }
        >
            <a
                href={project.url ?? '#'}
                target={'_blank'}
                aria-label={`Open ${project.name}`}
                className="text-decoration-none"
            >
                {content}
            </a>
        </OverlayTrigger>
    );
}
