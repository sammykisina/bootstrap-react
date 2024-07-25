import { User } from ".";

export type Book = {
    id: number;
    title: string;
    description: string;
    isbn: string;
    author: User;
};
