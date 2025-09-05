import ProjectInitials from '@/components/ProjectInitials.tsx';
import { useSearch } from '@/hooks/useSearch.tsx';
import { ProjectType } from '@/types/project';
import { useMemo } from 'react';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';

type ProjectProps = {
    project: ProjectType;
};

export default function Project({ project }: ProjectProps) {
    const { search } = useSearch();
    let logo = null;

    if (project.icon) {
        if (project.icon.startsWith('/') || project.icon?.startsWith('https://')) {
            logo = project.icon;
        } else {
            logo = `https://raw.githubusercontent.com/multiversx/mx-assets/master/accounts/icons/${project.icon}`;
        }
    }

    const classNames = useMemo(() => {
        if (search !== '') {
            return project.name.toLowerCase().includes(search) ? 'search-show' : 'search-hide';
        }

        return '';
    }, [project.name, search]);

    return (
        <OverlayTrigger
            placement={'bottom'}
            offset={[0, 16]}
            trigger={['hover', 'focus']}
            overlay={<Tooltip>{project.name}</Tooltip>}
        >
            <a href={project.url ?? '#'} target={'_blank'} aria-label={`Open ${project.name}`} className={classNames}>
                {logo ? <Image src={logo} alt={project.name} /> : <ProjectInitials project={project} />}
            </a>
        </OverlayTrigger>
    );
}
