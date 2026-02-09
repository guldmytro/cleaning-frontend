import type { Review } from "$lib/types/review";
import type { Result } from "$lib/types/result";

export type PageProps = {
    reviews: Review[];
    results: Result[];
}