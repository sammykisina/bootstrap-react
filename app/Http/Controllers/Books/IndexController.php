<?php

declare(strict_types=1);

namespace App\Http\Controllers\Books;

use App\Http\Concerns\HasInertiaResponse;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Response;

final class IndexController
{
    use HasInertiaResponse;

    public function __invoke(Request $request): Response
    {
        $books = Book::query()->with('author')->get();

        return $this->response->render(
            component: 'Books/Index',
            props: [
                'books' => BookResource::collection(
                    resource: $books,
                ),
            ],
        );
    }
}
