import { ComponentData } from './stacks';

export type DialogProps = {
    isOpen: boolean;
    onClose: () => void;
};

export type ComponentDialogProps = DialogProps & {
    componentData?: ComponentData;
};
