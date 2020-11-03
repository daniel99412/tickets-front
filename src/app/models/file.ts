import { Ticket } from './ticket';

export class File {
    ticket: Ticket;
    path: string;

    constructor(
        ticket?: Ticket,
        path?: string
    ) {
        this.ticket = ticket;
        this.path = path;
    }
}
