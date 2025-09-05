import ProjectInitials from '@/components/ProjectInitials.tsx';
import { ProjectType } from '@/types/project';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';

type ProjectProps = {
    project: ProjectType;
};

export default function Project({ project }: ProjectProps) {
    let logo = null;

    if (project.icon) {
        if (project.icon.startsWith('/') || project.icon?.startsWith('https://')) {
            logo = project.icon;
        } else {
            logo = `https://raw.githubusercontent.com/multiversx/mx-assets/master/accounts/icons/${project.icon}`;
        }
    }

    return (
        <OverlayTrigger
            placement={'bottom'}
            offset={[0, 16]}
            trigger={['hover', 'focus']}
            overlay={<Tooltip>{project.name}</Tooltip>}
        >
            <a href={project.url ?? '#'} target={'_blank'} aria-label={`Open ${project.name}`}>
                {logo ? <Image src={logo} alt={project.name} /> : <ProjectInitials project={project} />}
            </a>
        </OverlayTrigger>
    );
}
