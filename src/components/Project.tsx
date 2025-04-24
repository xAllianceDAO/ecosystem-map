import ProjectInitials from '@/components/ProjectInitials.tsx';
import { ProjectType } from '@/types/project';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import './Project.scss';

type ProjectProps = {
    project: ProjectType;
    showLogo: boolean;
    canAnimate: boolean;
    projectIndex: number;
    totalProjects: number;
}

const calculateBaseDelay = (projectIndex: number, totalProjects: number) => {
    // Ajuster les intervalles selon le nombre de projets
    let baseInterval;
    if (totalProjects > 20) {
        baseInterval = 0.03; // Très rapide pour les grandes catégories
    } else if (totalProjects > 10) {
        baseInterval = 0.05; // Moyennement rapide
    } else {
        baseInterval = 0.08; // Plus lent pour les petites catégories
    }
    return projectIndex * baseInterval;
};

export default function Project({ 
    project, 
    showLogo, 
    canAnimate, 
    projectIndex,
    totalProjects 
}: ProjectProps) {
    const controls = useAnimation();
    const [isLoaded, setIsLoaded] = useState(false);
    let logo = null;

    // Générer un délai aléatoire unique pour ce projet
    const randomDelay = useMemo(() => {
        const baseDelay = calculateBaseDelay(projectIndex, totalProjects);
        // Ajuster la variation aléatoire selon le nombre de projets
        let maxJitter;
        if (totalProjects > 20) {
            maxJitter = 0.02; // Petite variation pour les grandes catégories
        } else if (totalProjects > 10) {
            maxJitter = 0.04; // Variation moyenne
        } else {
            maxJitter = 0.06; // Plus grande variation pour les petites catégories
        }
        const jitter = Math.random() * maxJitter * 2 - maxJitter;
        return baseDelay + jitter;
    }, [projectIndex, totalProjects]);

    if (project.icon && showLogo) {
        if (project.icon.startsWith('/') || project.icon?.startsWith('https://')) {
            logo = project.icon;
        } else {
            logo = `https://raw.githubusercontent.com/multiversx/mx-assets/master/accounts/icons/${project.icon}`;
        }
    }

    useEffect(() => {
        if (isLoaded && canAnimate) {
            controls.start({
                scale: 1,
                opacity: 1,
                transition: {
                    type: "spring",
                    duration: 0.4,
                    delay: randomDelay,
                    bounce: 0.3
                }
            });
        }
    }, [isLoaded, canAnimate, controls, randomDelay]);

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    const getAnimationProps = () => ({
        initial: { scale: 0, opacity: 0 },
        animate: canAnimate ? {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                duration: 0.4,
                delay: randomDelay,
                bounce: 0.3
            }
        } : {},
    });

    const content = showLogo ? (
        logo ? (
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={controls}
            >
                <Image 
                    src={logo} 
                    alt={project.name} 
                    className="project-logo" 
                    onLoad={handleImageLoad}
                />
            </motion.div>
        ) : (
            <motion.div {...getAnimationProps()}>
                <ProjectInitials project={project} />
            </motion.div>
        )
    ) : (
        <motion.span 
            className="project-name px-2 py-1 rounded bg-secondary text-primary"
            {...getAnimationProps()}
        >
            {project.name}
        </motion.span>
    );

    return (
        <OverlayTrigger
            placement={'bottom'}
            offset={[0, 16]}
            trigger={['hover', 'focus']}
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
