<?php

declare(strict_types=1);

namespace App\Http\Concerns;

use Inertia\ResponseFactory;

trait HasInertiaResponse
{
    public function __construct(
        private readonly ResponseFactory $response,
    ) {}
}
