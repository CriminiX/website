export interface DocumentationConfig {
    title: string;
    children: DocumentationConfigChildren[];
}

export interface DocumentationConfigChildren {
    title: string;
    path: string;
}

export type DocumentationConfigModel = Array<DocumentationConfig>