export interface StackData {
    id: string;
    created: string;
    updated: string;
    user: string;
    project: string;
    is_shared: boolean;
    name: string;
    description: string;
    components: {
        [key: string]: string[];
    };
}

export interface ComponentData {
    id: string;
    created: string;
    updated: string;
    user: string;
    project: string;
    is_shared: boolean;
    name: string;
    type: string;
    flavor: string;
    configuration: {
        synchronous: boolean;
        timeout: number;
        client_args: Record<string, unknown>;
        user_namespace: string | null;
        node_selectors: Record<string, string>;
        node_affinity: Record<string, unknown>;
        pod_settings: null | unknown;
        kubeflow_pipelines_ui_port: number;
        kubeflow_hostname: string;
        kubeflow_namespace: string;
        kubernetes_context: string;
        skip_local_validations: boolean;
        skip_cluster_provisioning: boolean;
        skip_ui_daemon_provisioning: boolean;
    };
}
