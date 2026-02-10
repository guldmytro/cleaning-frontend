import type { CategoryArchive } from "$lib/types/category";
import type { ServiceArchive } from "$lib/types/service";
import type { Seo } from "$lib/types/seo";

export type PageProps = {
    category: CategoryArchive;
    services: ServiceArchive[];
    seo: Seo;
}