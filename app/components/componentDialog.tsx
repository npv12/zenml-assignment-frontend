import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { ComponentDialogProps } from '../types/dialog';
import { convertSlugToTitle } from '../utils/common';

const ComponentDialog = (props: ComponentDialogProps) => {
    return (
        <Dialog open={props.isOpen} onOpenChange={props.onClose}>
            {props.componentData && (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <strong>
                                {convertSlugToTitle(props.componentData.name)}
                            </strong>
                        </DialogTitle>
                        <DialogDescription>
                            <p>
                                <strong>Flavor:</strong>{' '}
                                {props.componentData.flavor}
                            </p>
                            <p>
                                <strong>Type:</strong>{' '}
                                {props.componentData.type}
                            </p>
                            <p>
                                <strong>User ID:</strong>{' '}
                                {props.componentData.user}
                            </p>
                            <p className="mt-2">
                                <strong>Configuration</strong>
                            </p>
                            <ul className="ml-2">
                                <li>
                                    Synchronous:{' '}
                                    {props.componentData.configuration
                                        .synchronous
                                        ? 'Yes'
                                        : 'No'}
                                </li>
                                <li>
                                    Timeout:{' '}
                                    {props.componentData.configuration.timeout}
                                </li>
                                <li>
                                    User Namespace:{' '}
                                    {props.componentData.configuration
                                        .user_namespace || 'N/A'}
                                </li>
                                <li>
                                    Kubeflow Pipelines UI Port:{' '}
                                    {
                                        props.componentData.configuration
                                            .kubeflow_pipelines_ui_port
                                    }
                                </li>
                                <li>
                                    Kubeflow Hostname:{' '}
                                    {
                                        props.componentData.configuration
                                            .kubeflow_hostname
                                    }
                                </li>
                                <li>
                                    Kubeflow Namespace:{' '}
                                    {
                                        props.componentData.configuration
                                            .kubeflow_namespace
                                    }
                                </li>
                                <li>
                                    Kubernetes Context:{' '}
                                    {
                                        props.componentData.configuration
                                            .kubernetes_context
                                    }
                                </li>
                                <li>
                                    Skip Local Validations:{' '}
                                    {props.componentData.configuration
                                        .skip_local_validations
                                        ? 'Yes'
                                        : 'No'}
                                </li>
                                <li>
                                    Skip Cluster Provisioning:{' '}
                                    {props.componentData.configuration
                                        .skip_cluster_provisioning
                                        ? 'Yes'
                                        : 'No'}
                                </li>
                                <li>
                                    Skip UI Daemon Provisioning:{' '}
                                    {props.componentData.configuration
                                        .skip_ui_daemon_provisioning
                                        ? 'Yes'
                                        : 'No'}
                                </li>
                                <li>
                                    Client Args:{' '}
                                    <pre>
                                        {JSON.stringify(
                                            props.componentData.configuration
                                                .client_args,
                                            null,
                                            2,
                                        )}
                                    </pre>
                                </li>
                                <li>
                                    Node Selectors:{' '}
                                    <pre>
                                        {JSON.stringify(
                                            props.componentData.configuration
                                                .node_selectors,
                                            null,
                                            2,
                                        )}
                                    </pre>
                                </li>
                                <li>
                                    Node Affinity:{' '}
                                    <pre>
                                        {JSON.stringify(
                                            props.componentData.configuration
                                                .node_affinity,
                                            null,
                                            2,
                                        )}
                                    </pre>
                                </li>
                                <li>
                                    Pod Settings:{' '}
                                    <pre>
                                        {JSON.stringify(
                                            props.componentData.configuration
                                                .pod_settings,
                                            null,
                                            2,
                                        )}
                                    </pre>
                                </li>
                            </ul>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            )}
        </Dialog>
    );
};

export default ComponentDialog;
