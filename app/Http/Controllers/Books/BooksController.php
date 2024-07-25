<?php

declare(strict_types=1);

namespace App\Http\Controllers\Books;

use App\Http\Concerns\HasInertiaResponse;
use App\Http\Requests\BookRequest;
use App\Models\Book;
use App\Services\BookService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

final class BooksController
{
    use HasInertiaResponse;

    public function __construct(
        protected BookService $bookService
    ) {}

    /**
     * @param BookRequest $request
     * @return RedirectResponse
     */
    public function createBook(BookRequest $request): RedirectResponse
    {
        try {
            $this->bookService->createBook(
                data: $request->validated()
            );

        } catch (\Throwable $th) {
            return redirect()->back()->withErrors([
                'book_not_created' => $th->getMessage(),
            ]);
        }

        return new RedirectResponse(
            url: action(
                name: IndexController::class,
            ),
        );
    }

    /**
     * @param BookRequest $request
     * @param Book $book
     * @return RedirectResponse
     */
    public function updateBook(BookRequest $request, Book $book): RedirectResponse
    {
        try {
            $this->bookService->updateBook(
                data: $request->validated(),
                book: $book,
            );

        } catch (\Throwable $th) {
            return redirect()->back()->withErrors([
                'book_not_updated' => $th->getMessage(),
            ]);
        }

        return new RedirectResponse(
            url: action(
                name: IndexController::class,
            ),
        );
    }

    /**
     * @param BookRequest $request
     * @param Book $book
     * @return RedirectResponse
     */
    public function destroyBook(Request $request, Book $book): RedirectResponse
    {
        $this->bookService->destroyBook(
                book: $book,
            );

        return new RedirectResponse(
            url: action(
                name: IndexController::class,
            ),
        );
    }
}
