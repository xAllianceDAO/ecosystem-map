import type { Component } from 'react';

type MasonryInstance = Component & {
    masonry: {
        layout: () => void;
    };
};
