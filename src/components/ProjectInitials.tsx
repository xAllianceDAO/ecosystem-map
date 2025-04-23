import { ProjectType } from '@/types/project';

type ProjectInitialsProps = {
    project: ProjectType,
}

export default function ProjectInitials({ project }: ProjectInitialsProps) {
    let initials = project.name.substring(0, 2);

    if (project.name.includes(' ')) {
        const parts = project.name.split(' ', 2);
        initials = parts[0].substring(0, 1) + parts[1].substring(0, 1);
    }

    return (
        <div className={'initials'}>
            {initials.toUpperCase()}
        </div>
    );
}
