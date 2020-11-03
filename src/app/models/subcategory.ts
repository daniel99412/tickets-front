import { Category } from './category';

export class Subcategory {
    id: string;
    name: string;
    category: Category;
    active: boolean;

    constructor(
        id?: string,
        name?: string,
        category?: Category,
        active?: boolean
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.active = active;
    }
}
