import { TRUNCATE_LABEL_LENGTH } from './constants';

export const convertSlugToTitle = (title: string) => {
    return title
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const truncateLabel = (label: string): string => {
    if (label.length <= TRUNCATE_LABEL_LENGTH) {
        return label;
    }
    return `${label.slice(0, TRUNCATE_LABEL_LENGTH)}...`;
};
