import type { City } from "$lib/types/city";
import type { CategoryArchive } from "$lib/types/category";


export type LayoutProps = {
    cities: City[];
    currentCity: string;
    currentCitySlug: string;
    currentCityObj: City;
    categories: CategoryArchive[];
}