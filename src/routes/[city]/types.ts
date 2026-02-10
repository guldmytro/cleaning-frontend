import type { Review } from "$lib/types/review";
import type { Result } from "$lib/types/result";
import type { Seo } from "$lib/types/seo";

export type PageProps = {
    reviews: Review[];
    results: Result[];
    seo: Seo;
}