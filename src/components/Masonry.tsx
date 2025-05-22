/* eslint-disable @typescript-eslint/no-explicit-any */
import { MasonryInstance } from '@/types/masonry';
import imagesLoaded from 'imagesloaded';
import React, { ForwardedRef, forwardRef, ReactNode, useEffect } from 'react';
import MasonryOriginal from 'react-masonry-component';
import ElementSelector = ImagesLoaded.ElementSelector;

type MasonryProps = {
    children?: ReactNode;
    className?: string;
    options?: Record<string, any>;
};

const Masonry = forwardRef<any, MasonryProps>((props, ref: ForwardedRef<MasonryInstance>) => {
    const MasonryCast = MasonryOriginal as React.ComponentType<any>;

    const options = {
        ...props.options,
        imagesLoaded: true,
    };

    useEffect(() => {
        if (ref && typeof ref === 'object' && ref.current) {
            const masonryElement = ref.current;

            imagesLoaded(masonryElement as unknown as ElementSelector, () => {
                if (masonryElement.masonry && typeof masonryElement.masonry.layout === 'function') {
                    masonryElement.masonry.layout();
                }
            });
        }
    }, [ref, props.children]);

    return <MasonryCast ref={ref} {...props} options={options} />;
});

export default Masonry;
