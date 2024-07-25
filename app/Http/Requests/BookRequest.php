<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class BookRequest extends FormRequest
{
    /** @return array<string, array<mixed>|string> */
    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'max:255',
            ],
            'description' => [
                'required',
                'string',
                'max:255',
            ],
            'isbn' => [
                'required',
                Rule::unique('books', 'isbn')->ignore(id: $this->book ? $this->book->id : null),
            ],
        ];
    }
}
