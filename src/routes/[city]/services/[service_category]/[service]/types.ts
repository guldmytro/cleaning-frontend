import type { ServiceDetail } from "$lib/types/service"
import type { Review } from "$lib/types/review";

export type PageProps = {
    service: ServiceDetail;
    reviews: Review[];
}