<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\JobOffer;
use App\Models\Position;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobOfferController extends Controller
{
    public function index()
    {
        $offers = JobOffer::with([
            'application.candidate',
            'application.jobPosting',
            'position',
        ])
            ->latest('offer_date')
            ->get();

        return Inertia::render(
            'Recruitment/JobOffers/Index',
            [
                'offers' => $offers,

                'applications' => Application::with([
                    'candidate',
                    'jobPosting',
                ])
                    ->latest()
                    ->get(),

                'positions' => Position::orderBy('title')->get(),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'application_id' => 'required|exists:applications,id',
            'position_id' => 'required|exists:positions,id',
            'salary' => 'required|numeric|min:0',
            'joining_date' => 'required|date',
            'offer_date' => 'required|date',
            'expiry_date' => 'nullable|date|after_or_equal:offer_date',
            'status' => 'required|string|max:50',
            'document_path' => 'nullable|string|max:500',
        ]);

        JobOffer::create($validated);

        return redirect()
            ->route('job-offers.index')
            ->with(
                'success',
                'Job offer created successfully.'
            );
    }

    public function update(
        Request $request,
        JobOffer $jobOffer
    ) {
        $validated = $request->validate([
            'application_id' => 'required|exists:applications,id',
            'position_id' => 'required|exists:positions,id',
            'salary' => 'required|numeric|min:0',
            'joining_date' => 'required|date',
            'offer_date' => 'required|date',
            'expiry_date' => 'nullable|date|after_or_equal:offer_date',
            'status' => 'required|string|max:50',
            'document_path' => 'nullable|string|max:500',
        ]);

        $jobOffer->update($validated);

        return redirect()
            ->route('job-offers.index')
            ->with(
                'success',
                'Job offer updated successfully.'
            );
    }

    public function destroy(JobOffer $jobOffer)
    {
        $jobOffer->delete();

        return redirect()
            ->route('job-offers.index')
            ->with(
                'success',
                'Job offer deleted successfully.'
            );
    }
}