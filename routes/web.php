<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\LegalEntityController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\BusinessUnitController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\CostCenterController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeePersonalDetailController;
use App\Http\Controllers\EmployeeContactController;
use App\Http\Controllers\EmployeeAddressController;
use App\Http\Controllers\EmployeeEmergencyContactController;
use App\Http\Controllers\EmployeeFamilyMemberController;
use App\Http\Controllers\EmployeeEducationController;
use App\Http\Controllers\EmployeeExperienceController;
use App\Http\Controllers\EmployeeSkillController;
use App\Http\Controllers\EmployeeCertificationController;
use App\Http\Controllers\EmploymentTypeController;
use App\Http\Controllers\EmploymentStatusController;
use App\Http\Controllers\JobGradeController;
use App\Http\Controllers\JobLevelController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\EmployeeEmploymentHistoryController;
use App\Http\Controllers\JobRequisitionController;
use App\Http\Controllers\JobPostingController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\CandidateContactController;
use App\Http\Controllers\CandidateEducationController;
use App\Http\Controllers\CandidateExperienceController;
use App\Http\Controllers\CandidateSkillController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\ApplicationStatusHistoryController;
use App\Http\Controllers\InterviewController;
use App\Http\Controllers\InterviewerController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\JobOfferController;
use App\Http\Controllers\OnboardingTemplateController;
use App\Http\Controllers\OnboardingTaskController;
use App\Http\Controllers\EmployeeOnboardingController;
use App\Http\Controllers\EmployeeOnboardingTaskController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
    });

Route::middleware(['auth'])->group(function () {
    Route::post('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');

    Route::resource('tenants', TenantController::class);
    Route::get('legal-entities', [OrganizationController::class, 'legalEntities'])
    ->name('legal-entities.index');

    Route::get('legal-entities/create', [LegalEntityController::class, 'create'])
    ->name('legal-entities.create');

Route::post('legal-entities', [LegalEntityController::class, 'store'])
    ->name('legal-entities.store');

    Route::get('companies', [CompanyController::class, 'index'])
    ->name('companies.index');

Route::get('companies/create', [CompanyController::class, 'create'])
    ->name('companies.create');

Route::post('companies', [CompanyController::class, 'store'])
    ->name('companies.store');
    Route::get('business-units', [BusinessUnitController::class, 'index'])
    ->name('business-units.index');

Route::get('business-units/create', [BusinessUnitController::class, 'create'])
    ->name('business-units.create');

Route::post('business-units', [BusinessUnitController::class, 'store'])
    ->name('business-units.store');
    Route::get('branches', [BranchController::class, 'index'])
    ->name('branches.index');

Route::get('branches/create', [BranchController::class, 'create'])
    ->name('branches.create');

Route::post('branches', [BranchController::class, 'store'])
    ->name('branches.store');
    Route::get('departments', [DepartmentController::class, 'index'])
    ->name('departments.index');

Route::get('departments/create', [DepartmentController::class, 'create'])
    ->name('departments.create');

Route::post('departments', [DepartmentController::class, 'store'])
    ->name('departments.store');
    Route::get('divisions', [DivisionController::class, 'index'])
    ->name('divisions.index');

Route::get('divisions/create', [DivisionController::class, 'create'])
    ->name('divisions.create');

Route::post('divisions', [DivisionController::class, 'store'])
    ->name('divisions.store');
    Route::get('locations', [LocationController::class, 'index'])
    ->name('locations.index');

Route::get('locations/create', [LocationController::class, 'create'])
    ->name('locations.create');

Route::post('locations', [LocationController::class, 'store'])
    ->name('locations.store');
    Route::get('cost-centers', [CostCenterController::class, 'index'])
    ->name('cost-centers.index');

Route::get('cost-centers/create', [CostCenterController::class, 'create'])
    ->name('cost-centers.create');

Route::post('cost-centers', [CostCenterController::class, 'store'])
    ->name('cost-centers.store');

    Route::get('employees', [EmployeeController::class, 'index'])
    ->name('employees.index');

Route::get('employees/create', [EmployeeController::class, 'create'])
    ->name('employees.create');

Route::post('employees', [EmployeeController::class, 'store'])
    ->name('employees.store');
    Route::get(
    'employees/{employee}/personal-details',
    [EmployeePersonalDetailController::class, 'create']
)->name('employees.personal-details.create');

Route::post(
    'employees/{employee}/personal-details',
    [EmployeePersonalDetailController::class, 'store']
)->name('employees.personal-details.store');
Route::get(
    'employees/{employee}/contacts',
    [EmployeeContactController::class, 'create']
)->name('employees.contacts.create');

Route::post(
    'employees/{employee}/contacts',
    [EmployeeContactController::class, 'store']
)->name('employees.contacts.store');

Route::delete(
    'employees/{employee}/contacts/{contact}',
    [EmployeeContactController::class, 'destroy']
)->name('employees.contacts.destroy');

Route::get(
    'employees/{employee}/addresses',
    [EmployeeAddressController::class, 'create']
)->name('employees.addresses.create');

Route::post(
    'employees/{employee}/addresses',
    [EmployeeAddressController::class, 'store']
)->name('employees.addresses.store');

Route::delete(
    'employees/{employee}/addresses/{address}',
    [EmployeeAddressController::class, 'destroy']
)->name('employees.addresses.destroy');
Route::get(
    'employees/{employee}/emergency-contacts',
    [EmployeeEmergencyContactController::class, 'create']
)->name('employees.emergency-contacts.create');

Route::post(
    'employees/{employee}/emergency-contacts',
    [EmployeeEmergencyContactController::class, 'store']
)->name('employees.emergency-contacts.store');

Route::delete(
    'employees/{employee}/emergency-contacts/{emergencyContact}',
    [EmployeeEmergencyContactController::class, 'destroy']
)->name('employees.emergency-contacts.destroy');
Route::get(
    'employees/{employee}/family-members',
    [EmployeeFamilyMemberController::class, 'create']
)->name('employees.family-members.create');

Route::post(
    'employees/{employee}/family-members',
    [EmployeeFamilyMemberController::class, 'store']
)->name('employees.family-members.store');

Route::delete(
    'employees/{employee}/family-members/{familyMember}',
    [EmployeeFamilyMemberController::class, 'destroy']
)->name('employees.family-members.destroy');
Route::get(
    'employees/{employee}/education',
    [EmployeeEducationController::class, 'create']
)->name('employees.education.create');

Route::post(
    'employees/{employee}/education',
    [EmployeeEducationController::class, 'store']
)->name('employees.education.store');

Route::delete(
    'employees/{employee}/education/{education}',
    [EmployeeEducationController::class, 'destroy']
)->name('employees.education.destroy');
Route::get(
    'employees/{employee}/experience',
    [EmployeeExperienceController::class, 'create']
)->name('employees.experience.create');

Route::post(
    'employees/{employee}/experience',
    [EmployeeExperienceController::class, 'store']
)->name('employees.experience.store');

Route::delete(
    'employees/{employee}/experience/{experience}',
    [EmployeeExperienceController::class, 'destroy']
)->name('employees.experience.destroy');
Route::get(
    'employees/{employee}/skills',
    [EmployeeSkillController::class, 'create']
)->name('employees.skills.create');

Route::post(
    'employees/{employee}/skills',
    [EmployeeSkillController::class, 'store']
)->name('employees.skills.store');

Route::delete(
    'employees/{employee}/skills/{employeeSkill}',
    [EmployeeSkillController::class, 'destroy']
)->name('employees.skills.destroy');

Route::get(
    'employees/{employee}/certifications',
    [EmployeeCertificationController::class, 'create']
)->name('employees.certifications.create');

Route::post(
    'employees/{employee}/certifications',
    [EmployeeCertificationController::class, 'store']
)->name('employees.certifications.store');

Route::delete(
    'employees/{employee}/certifications/{employeeCertification}',
    [EmployeeCertificationController::class, 'destroy']
)->name('employees.certifications.destroy');
Route::get(
    'employees/{employee}',
    [EmployeeController::class, 'show']
)->name('employees.show');
Route::get(
    '/employment-structure/employment-types',
    [EmploymentTypeController::class, 'index']
)->name('employment-types.index');

Route::post(
    '/employment-structure/employment-types',
    [EmploymentTypeController::class, 'store']
)->name('employment-types.store');

Route::put(
    '/employment-structure/employment-types/{employmentType}',
    [EmploymentTypeController::class, 'update']
)->name('employment-types.update');

Route::delete(
    '/employment-structure/employment-types/{employmentType}',
    [EmploymentTypeController::class, 'destroy']
)->name('employment-types.destroy');
Route::get(
    '/employment-structure/job-grades',
    [JobGradeController::class, 'index']
)->name('job-grades.index');

Route::post(
    '/employment-structure/job-grades',
    [JobGradeController::class, 'store']
)->name('job-grades.store');

Route::put(
    '/employment-structure/job-grades/{jobGrade}',
    [JobGradeController::class, 'update']
)->name('job-grades.update');

Route::delete(
    '/employment-structure/job-grades/{jobGrade}',
    [JobGradeController::class, 'destroy']
)->name('job-grades.destroy');
Route::get(
    '/employment-structure/employment-statuses',
    [EmploymentStatusController::class, 'index']
)->name('employment-statuses.index');

Route::post(
    '/employment-structure/employment-statuses',
    [EmploymentStatusController::class, 'store']
)->name('employment-statuses.store');

Route::put(
    '/employment-structure/employment-statuses/{employmentStatus}',
    [EmploymentStatusController::class, 'update']
)->name('employment-statuses.update');

Route::delete(
    '/employment-structure/employment-statuses/{employmentStatus}',
    [EmploymentStatusController::class, 'destroy']
)->name('employment-statuses.destroy');
Route::get(
    '/employment-structure/job-levels',
    [JobLevelController::class, 'index']
)->name('job-levels.index');

Route::post(
    '/employment-structure/job-levels',
    [JobLevelController::class, 'store']
)->name('job-levels.store');

Route::put(
    '/employment-structure/job-levels/{jobLevel}',
    [JobLevelController::class, 'update']
)->name('job-levels.update');

Route::delete(
    '/employment-structure/job-levels/{jobLevel}',
    [JobLevelController::class, 'destroy']
)->name('job-levels.destroy');
Route::get(
    '/employment-structure/positions',
    [PositionController::class, 'index']
)->name('positions.index');

Route::post(
    '/employment-structure/positions',
    [PositionController::class, 'store']
)->name('positions.store');

Route::put(
    '/employment-structure/positions/{position}',
    [PositionController::class, 'update']
)->name('positions.update');

Route::delete(
    '/employment-structure/positions/{position}',
    [PositionController::class, 'destroy']
)->name('positions.destroy');
Route::get(
    '/employment-history',
    [EmployeeEmploymentHistoryController::class, 'index']
)->name('employment-history.index');

Route::post(
    '/employment-history',
    [EmployeeEmploymentHistoryController::class, 'store']
)->name('employment-history.store');

Route::put(
    '/employment-history/{employeeEmploymentHistory}',
    [EmployeeEmploymentHistoryController::class, 'update']
)->name('employment-history.update');

Route::delete(
    '/employment-history/{employeeEmploymentHistory}',
    [EmployeeEmploymentHistoryController::class, 'destroy']
)->name('employment-history.destroy');

Route::get(
    '/job-requisitions',
    [JobRequisitionController::class, 'index']
)->name('job-requisitions.index');

Route::post(
    '/job-requisitions',
    [JobRequisitionController::class, 'store']
)->name('job-requisitions.store');

Route::put(
    '/job-requisitions/{jobRequisition}',
    [JobRequisitionController::class, 'update']
)->name('job-requisitions.update');

Route::delete(
    '/job-requisitions/{jobRequisition}',
    [JobRequisitionController::class, 'destroy']
)->name('job-requisitions.destroy');
Route::get(
    '/job-postings',
    [JobPostingController::class, 'index']
)->name('job-postings.index');

Route::post(
    '/job-postings',
    [JobPostingController::class, 'store']
)->name('job-postings.store');

Route::put(
    '/job-postings/{jobPosting}',
    [JobPostingController::class, 'update']
)->name('job-postings.update');

Route::delete(
    '/job-postings/{jobPosting}',
    [JobPostingController::class, 'destroy']
)->name('job-postings.destroy');
Route::get(
    '/candidates',
    [CandidateController::class, 'index']
)->name('candidates.index');

Route::post(
    '/candidates',
    [CandidateController::class, 'store']
)->name('candidates.store');

Route::put(
    '/candidates/{candidate}',
    [CandidateController::class, 'update']
)->name('candidates.update');

Route::delete(
    '/candidates/{candidate}',
    [CandidateController::class, 'destroy']
)->name('candidates.destroy');
Route::get(
    '/candidate-contacts',
    [CandidateContactController::class, 'index']
)->name('candidate-contacts.index');

Route::post(
    '/candidate-contacts',
    [CandidateContactController::class, 'store']
)->name('candidate-contacts.store');

Route::put(
    '/candidate-contacts/{candidateContact}',
    [CandidateContactController::class, 'update']
)->name('candidate-contacts.update');

Route::delete(
    '/candidate-contacts/{candidateContact}',
    [CandidateContactController::class, 'destroy']
)->name('candidate-contacts.destroy');
Route::get(
    '/candidate-education',
    [CandidateEducationController::class, 'index']
)->name('candidate-education.index');

Route::post(
    '/candidate-education',
    [CandidateEducationController::class, 'store']
)->name('candidate-education.store');

Route::put(
    '/candidate-education/{candidateEducation}',
    [CandidateEducationController::class, 'update']
)->name('candidate-education.update');

Route::delete(
    '/candidate-education/{candidateEducation}',
    [CandidateEducationController::class, 'destroy']
)->name('candidate-education.destroy');
Route::get(
    '/candidate-experience',
    [CandidateExperienceController::class, 'index']
)->name('candidate-experience.index');

Route::post(
    '/candidate-experience',
    [CandidateExperienceController::class, 'store']
)->name('candidate-experience.store');

Route::put(
    '/candidate-experience/{candidateExperience}',
    [CandidateExperienceController::class, 'update']
)->name('candidate-experience.update');

Route::delete(
    '/candidate-experience/{candidateExperience}',
    [CandidateExperienceController::class, 'destroy']
)->name('candidate-experience.destroy');
Route::get('/candidate-skills', [CandidateSkillController::class, 'index'])
    ->name('candidate-skills.index');

Route::post('/candidate-skills', [CandidateSkillController::class, 'store'])
    ->name('candidate-skills.store');

Route::put('/candidate-skills/{candidateSkill}', [CandidateSkillController::class, 'update'])
    ->name('candidate-skills.update');

Route::delete('/candidate-skills/{candidateSkill}', [CandidateSkillController::class, 'destroy'])
    ->name('candidate-skills.destroy');
    Route::get('/applications', [ApplicationController::class, 'index'])
    ->name('applications.index');

Route::post('/applications', [ApplicationController::class, 'store'])
    ->name('applications.store');

Route::put('/applications/{application}', [ApplicationController::class, 'update'])
    ->name('applications.update');

Route::delete('/applications/{application}', [ApplicationController::class, 'destroy'])
    ->name('applications.destroy');
    Route::get('/application-status-histories', [ApplicationStatusHistoryController::class, 'index'])
    ->name('application-status-histories.index');

Route::post('/application-status-histories', [ApplicationStatusHistoryController::class, 'store'])
    ->name('application-status-histories.store');

Route::put('/application-status-histories/{applicationStatusHistory}', [ApplicationStatusHistoryController::class, 'update'])
    ->name('application-status-histories.update');

Route::delete('/application-status-histories/{applicationStatusHistory}', [ApplicationStatusHistoryController::class, 'destroy'])
    ->name('application-status-histories.destroy');
    Route::get('/interviews', [InterviewController::class, 'index'])
    ->name('interviews.index');

Route::post('/interviews', [InterviewController::class, 'store'])
    ->name('interviews.store');

Route::put('/interviews/{interview}', [InterviewController::class, 'update'])
    ->name('interviews.update');

Route::delete('/interviews/{interview}', [InterviewController::class, 'destroy'])
    ->name('interviews.destroy');
    Route::get('/interviewers', [InterviewerController::class, 'index'])
    ->name('interviewers.index');

Route::post('/interviewers', [InterviewerController::class, 'store'])
    ->name('interviewers.store');

Route::put('/interviewers/{interviewer}', [InterviewerController::class, 'update'])
    ->name('interviewers.update');

Route::delete('/interviewers/{interviewer}', [InterviewerController::class, 'destroy'])
    ->name('interviewers.destroy');
    Route::get('/assessments', [AssessmentController::class, 'index'])
    ->name('assessments.index');

Route::post('/assessments', [AssessmentController::class, 'store'])
    ->name('assessments.store');

Route::put('/assessments/{assessment}', [AssessmentController::class, 'update'])
    ->name('assessments.update');

Route::delete('/assessments/{assessment}', [AssessmentController::class, 'destroy'])
    ->name('assessments.destroy');
    Route::get('/job-offers', [JobOfferController::class, 'index'])
    ->name('job-offers.index');

Route::post('/job-offers', [JobOfferController::class, 'store'])
    ->name('job-offers.store');

Route::put('/job-offers/{jobOffer}', [JobOfferController::class, 'update'])
    ->name('job-offers.update');

Route::delete('/job-offers/{jobOffer}', [JobOfferController::class, 'destroy'])
    ->name('job-offers.destroy');
    Route::get('/onboarding-templates', [OnboardingTemplateController::class, 'index'])
    ->name('onboarding-templates.index');

Route::post('/onboarding-templates', [OnboardingTemplateController::class, 'store'])
    ->name('onboarding-templates.store');

Route::put('/onboarding-templates/{onboardingTemplate}', [OnboardingTemplateController::class, 'update'])
    ->name('onboarding-templates.update');

Route::delete('/onboarding-templates/{onboardingTemplate}', [OnboardingTemplateController::class, 'destroy'])
    ->name('onboarding-templates.destroy');
    Route::get('/onboarding-tasks', [OnboardingTaskController::class, 'index'])
    ->name('onboarding-tasks.index');

Route::post('/onboarding-tasks', [OnboardingTaskController::class, 'store'])
    ->name('onboarding-tasks.store');

Route::put('/onboarding-tasks/{onboardingTask}', [OnboardingTaskController::class, 'update'])
    ->name('onboarding-tasks.update');

Route::delete('/onboarding-tasks/{onboardingTask}', [OnboardingTaskController::class, 'destroy'])
    ->name('onboarding-tasks.destroy');
    Route::get('/employee-onboardings', [EmployeeOnboardingController::class, 'index'])
    ->name('employee-onboardings.index');

Route::post('/employee-onboardings', [EmployeeOnboardingController::class, 'store'])
    ->name('employee-onboardings.store');

Route::put('/employee-onboardings/{employeeOnboarding}', [EmployeeOnboardingController::class, 'update'])
    ->name('employee-onboardings.update');

Route::delete('/employee-onboardings/{employeeOnboarding}', [EmployeeOnboardingController::class, 'destroy'])
    ->name('employee-onboardings.destroy');
    Route::get('/employee-onboarding-tasks', [EmployeeOnboardingTaskController::class, 'index'])
    ->name('employee-onboarding-tasks.index');

Route::post('/employee-onboarding-tasks', [EmployeeOnboardingTaskController::class, 'store'])
    ->name('employee-onboarding-tasks.store');

Route::put('/employee-onboarding-tasks/{employeeOnboardingTask}', [EmployeeOnboardingTaskController::class, 'update'])
    ->name('employee-onboarding-tasks.update');

Route::delete('/employee-onboarding-tasks/{employeeOnboardingTask}', [EmployeeOnboardingTaskController::class, 'destroy'])
    ->name('employee-onboarding-tasks.destroy');
});


require __DIR__.'/settings.php';
