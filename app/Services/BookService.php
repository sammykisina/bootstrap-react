<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Book;

final class BookService
{
    /**
     * @param array $data
     * @return Book
     */
    public function createBook(array $data): Book
    {
        return Book::create([
            'title' => $data['title'],
            'description' => $data['description'],
            'isbn' => $data['isbn'],
            'author_id' => auth()->user()->id,
        ]);
    }

    /**
     * @param Book $book
     * @param array $data
     * @return bool
     */
    public function updateBook(Book $book, array $data): bool
    {
        return $book->update([
            'title' => $data['title'],
            'description' => $data['description'],
            'isbn' => $data['isbn'],
        ]);
    }

    /**
     * @param \App\Models\Book $book
     * @return bool
     */
    public function destroyBook(Book $book): bool
    {
        return $book->delete();
    }
}
