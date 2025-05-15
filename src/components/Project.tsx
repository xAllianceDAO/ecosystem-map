import ProjectInitials from '@/components/ProjectInitials.tsx';
import { ProjectType } from '@/types/project';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

type ProjectProps = {
    project: ProjectType;
    showLogo: boolean;
    canAnimate: boolean;
    projectIndex: number;
    totalProjects: number;
}

const calculateBaseDelay = (projectIndex: number, totalProjects: number) => {
    // Adjust intervals based on number of projects
    let baseInterval;
    if (totalProjects > 20) {
        baseInterval = 0.03; // Very fast for large categories
    } else if (totalProjects > 10) {
        baseInterval = 0.05; // Medium speed
    } else {
        baseInterval = 0.08; // Slower for small categories
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
    const [hasError, setHasError] = useState(false);
    let logo = null;

    // Generate a unique random delay for this project
    const randomDelay = useMemo(() => {
        const baseDelay = calculateBaseDelay(projectIndex, totalProjects);
        // Adjust random variation based on number of projects
        let maxJitter;
        if (totalProjects > 20) {
            maxJitter = 0.02; // Small variation for large categories
        } else if (totalProjects > 10) {
            maxJitter = 0.04; // Medium variation
        } else {
            maxJitter = 0.06; // Larger variation for small categories
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

    // Reset states when showLogo changes
    useEffect(() => {
        setIsLoaded(false);
        setHasError(false);
    }, [showLogo]);

    useEffect(() => {
        // Start animation when:
        // 1. Image is loaded successfully, or
        // 2. We have an error (need to show fallback), or
        // 3. No logo to load (just show initials)
        if ((isLoaded || hasError || !logo) && canAnimate) {
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
    }, [isLoaded, hasError, logo, canAnimate, controls, randomDelay]);

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    const handleImageError = () => {
        setHasError(true);
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
        logo && !hasError ? (
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={controls}
            >
                <Image 
                    src={logo} 
                    alt={project.name} 
                    className="project-logo" 
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    loading="lazy"
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
