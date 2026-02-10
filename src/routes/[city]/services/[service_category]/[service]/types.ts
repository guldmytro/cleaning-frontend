import type { ServiceDetail } from "$lib/types/service"
import type { Review } from "$lib/types/review";
import type { Seo } from "$lib/types/seo";

export type PageProps = {
    service: ServiceDetail;
    reviews: Review[];
    seo: Seo;
}