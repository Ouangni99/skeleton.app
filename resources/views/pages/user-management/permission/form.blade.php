@php
// dd($permissionData);
$modalTitle = (!empty($permissionData)) ? 'Modifier la permission' : 'Ajouter une permission'

@endphp

<form id="permissionFormID">

    <!--begin::Modal header-->
    <div class="modal-header">
        <!--begin::Modal title-->
        <h2 class="fw-bold">{{ $modalTitle }}</h2>
        <!--end::Modal title-->
        <!--begin::Close-->
        <div class="btn btn-icon btn-sm btn-active-icon-primary" data-kt-permissions-modal-action="close">
            <i class="ki-outline ki-cross fs-1"></i>
        </div>
        <!--end::Close-->
    </div>
    <!--end::Modal header-->

    <!--start::Modal Body-->
    <div class="modal-body scroll-y mx-5 mx-xl-15 my-7">
        <!--begin::Input group-->
        <div class="fv-row mb-7">
            <!--begin::Label-->
            <label class="fs-6 fw-semibold form-label mb-2">
                <span class="required">Nom de la permission</span>
                <span class="ms-2" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-html="true"
                    data-bs-content="Le nom de la permission doit être unique.">
                    <i class="ki-outline ki-information fs-7"></i>
                </span>
            </label>
            <!--end::Label-->
            <!--begin::Input-->
            <input class="form-control form-control-solid" placeholder="Saisir un nom de permission"
                name="permission_name" />
            <!--end::Input-->
        </div>
        <!--end::Input group-->
    </div>
    <!--end::Modal Body-->


    <!--start::Modal Footer-->
    <div class="modal-footer">
        <!--begin::Actions-->
        <div class="text-center">
            <button type="reset" class="btn btn-light me-3" data-kt-permissions-modal-action="cancel">Fermer</button>
            <button type="submit" class="btn btn-primary" data-kt-permissions-modal-action="submit">
                <span class="indicator-label">Enregistrer</span>
                <span class="indicator-progress">Please wait...
                    <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
            </button>
        </div>
        <!--end::Actions-->
    </div>
    <!--end::Modal Footer-->
</form>
