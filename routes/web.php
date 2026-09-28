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
use App\Http\Controllers\Teams\TeamInvitationController;
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
});


require __DIR__.'/settings.php';
