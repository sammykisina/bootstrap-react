<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @property-read Book $resource */
final class BookResource extends JsonResource
{
    /** @return array<string, mixed> */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,
            'title' => $this->resource->title,
            'description' => $this->resource->description,
            'isbn' => $this->resource->isbn,

            'author_id' => new UserResource(
                resource: $this->whenLoaded(
                    relationship: 'author',
                )
            ),
        ];
    }
}
