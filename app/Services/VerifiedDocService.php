<?php

namespace App\Services;

use App\Models\Institute;
use App\Models\VerifiedDoc;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class VerifiedDocService
{
    /**
     * @param Institute $institute O instituto ao qual o documento pertence.
     * @param array $docData Os dados do documento validados (type, file).
     * @return VerifiedDoc|null
     */
    public function handleUploadAndCreateOrUpdate(Institute $institute, array $docData): ?VerifiedDoc
    {
        $file = $docData['file'] ?? null;

        if (!$file instanceof UploadedFile) {
            return null;
        }

        if ($institute->verifiedDoc && $institute->verifiedDoc->link) {
            Storage::disk('public')->delete($institute->verifiedDoc->link);
        }

        $filePath = $file->store('verified_docs', 'public');

        return $institute->verifiedDoc()->updateOrCreate(
            ['institute_id' => $institute->id],
            [
                'type' => $docData['type'],
                'link' => $filePath,
                'status' => VerifiedDoc::STATUS_PENDING,
                'verification_date' => null,
            ]
        );
    }
}
