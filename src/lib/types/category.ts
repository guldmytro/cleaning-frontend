import type { ServiceMenu } from "./service";

export type CategoryDetail = {
    slug: string;
    title: string;
    description: string;
}

export type CategoryArchive = {
    slug: string;
    title: string;
    image: string;
    description: string;
    services: ServiceMenu[];
}
