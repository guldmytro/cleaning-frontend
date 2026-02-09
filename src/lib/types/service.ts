import type { CategoryDetail } from "./category";
import type { Result } from "./result";

export type ServiceDetail = {
    slug: string;
    image: string;
    title: string;
    description: string;
    body: string;
    faq: string;
    form_title: string;
    category: CategoryDetail;
    results: Result[];
}

export type ServiceArchive = {
    slug: string;
    image: string;
    short_title: string;
}

export type ServiceMenu = {
    slug: string;
    short_title: string;
}

