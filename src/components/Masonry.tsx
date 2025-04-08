/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, ReactNode } from 'react';
import MasonryOriginal from 'react-masonry-component';

type MasonryProps = {
    children?: ReactNode;
    className?: string;
    options?: Record<string, any>;
};

const Masonry = forwardRef<any, MasonryProps>((props, ref) => {
    const MasonryCast = MasonryOriginal as React.ComponentType<any>;
    return <MasonryCast ref={ref} {...props} />;
});

export default Masonry;
