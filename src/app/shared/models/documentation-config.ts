export interface DocumentationConfig {
    name: string;
    path?: string;
    children?: DocumentationConfig[];
}

export type DocumentationConfigModel = Array<DocumentationConfig>