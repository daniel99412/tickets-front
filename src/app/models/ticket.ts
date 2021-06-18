import { BranchOffice } from './branchOffice';
import { Category } from './category';
import { Subcategory } from './subcategory';
import { User } from './user';

export class Ticket {
    id: string;
    createdBy: User;
    reportedFrom: BranchOffice;
    assignedTo: User[];
    description: string;
    progress: number;
    category: Category;
    subcategory: Subcategory;
    creationDate: string;
    assignationDate: string;
    startDate: string;
    finalizationDate: string;
    cancelationDate: string;
    file: File[];
    priority: number;
    promiseDate: string;

    constructor(
        id?: string,
        createdBy?: User,
        reportedFrom?: BranchOffice,
        assignedTo?: User[],
        description?: string,
        progress?: number,
        category?: Category,
        subcategory?: Subcategory,
        creationDate?: string,
        assignationDate?: string,
        startDate?: string,
        finalizationDate?: string,
        cancelationDate?: string,
        file?: File[],
        priority?: number,
        promiseDate?: string
    ) {
        this.id = id;
        this.createdBy = createdBy;
        this.reportedFrom = reportedFrom;
        this.assignedTo = assignedTo;
        this.description = description;
        this.progress = progress;
        this.category = category;
        this.subcategory = subcategory;
        this.creationDate = creationDate;
        this.assignationDate = assignationDate;
        this.startDate = startDate;
        this.finalizationDate = finalizationDate;
        this.cancelationDate = cancelationDate;
        this.file = file;
        this.priority = priority;
        this.promiseDate = promiseDate
    }
}
