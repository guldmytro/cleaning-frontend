import type { CategoryArchive } from "$lib/types/category";
import type { ServiceArchive } from "$lib/types/service";

export type PageProps = {
    category: CategoryArchive;
    services: ServiceArchive[];
}