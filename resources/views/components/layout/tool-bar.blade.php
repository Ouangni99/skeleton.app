<div id="kt_app_toolbar" class="app-toolbar d-flex pb-lg-5">
    <!--begin::Toolbar container-->
    <div class="d-flex flex-stack flex-row-fluid">

        <!--begin::Toolbar container-->
        <div class="d-flex flex-column flex-row-fluid">
            <!--begin::Toolbar wrapper-->
            <!--begin::Page title-->
            <div class="page-title d-flex align-items-center me-3">
                <!--begin::Title-->
                <h1 class="page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-lg-2x gap-2">
                    <span>
                        @if (request()->routeIs('dashboard'))
                            @if (auth()->check())
                                <span class="fw-light">Bon retour parmi
                                    nous</span>,&nbsp;{{ mb_strtoupper(auth()->user()->name) }}
                    </span>
                    <!--begin::Description-->
                    <span class="page-desc text-gray-600 fs-base fw-semibold">Vous êtes connecté en tant que
                        propriétaire
                        du compte</span>
                    <!--end::Description-->
                    @else
                        <p>Non connecté</p>
                        @endif
                    @else
                        <!-- Votre code ici pour les autres routes -->
                        <div id="kt_app_toolbar" class="app-toolbar d-flex pb-3 pb-lg-5">
                            <!--begin::Toolbar container-->
                            <div class="d-flex flex-stack flex-row-fluid">
                                <!--begin::Toolbar container-->
                                <div class="d-flex flex-column flex-row-fluid">
                                    <!--begin::Toolbar wrapper-->
                                    <!--begin::Page title-->
                                    <div class="page-title d-flex align-items-center me-3">
                                        <!--begin::Title-->
                                        <h1
                                            class="page-heading d-flex flex-column justify-content-center text-dark fw-bold fs-lg-2x gap-2">
                                            <span>Permissions List</span>
                                        </h1>
                                        <!--end::Title-->
                                    </div>
                                    <!--end::Page title-->
                                    <!--begin::Breadcrumb-->
                                    <ul class="breadcrumb breadcrumb-separatorless fw-semibold mb-3 fs-7">
                                        <!--begin::Item-->
                                        <li class="breadcrumb-item text-gray-700 fw-bold lh-1">
                                            <a href="../../demo37/dist/index.html" class="text-white">
                                                <i class="ki-outline ki-home text-gray-700 fs-6"></i>
                                            </a>
                                        </li>
                                        <!--end::Item-->
                                        <!--begin::Item-->
                                        <li class="breadcrumb-item">
                                            <i class="ki-outline ki-right fs-7 text-gray-700 mx-n1"></i>
                                        </li>
                                        <!--end::Item-->
                                        <!--begin::Item-->
                                        <li class="breadcrumb-item text-gray-700 fw-bold lh-1">User Management</li>
                                        <!--end::Item-->
                                        <!--begin::Item-->
                                        <li class="breadcrumb-item">
                                            <i class="ki-outline ki-right fs-7 text-gray-700 mx-n1"></i>
                                        </li>
                                        <!--end::Item-->
                                        <!--begin::Item-->
                                        <li class="breadcrumb-item text-gray-700">Permissions</li>
                                        <!--end::Item-->
                                    </ul>
                                    <!--end::Breadcrumb-->
                                </div>
                                <!--end::Actions-->
                            </div>
                            <!--end::Toolbar container-->
                        </div>
                        @endif
                    </h1>
                <!--end::Title-->
            </div>
            <!--end::Page title-->
        </div>
        <!--end::Toolbar container-->

        <!--begin::Actions-->
        <div class="d-flex align-self-center flex-center flex-shrink-0">
            <a href="#" class="btn btn-sm btn-success d-flex flex-center ms-3 px-4 py-3" data-bs-toggle="modal"
                data-bs-target="#kt_modal_invite_friends">
                <i class="ki-outline ki-plus-square fs-2"></i>
                <span>Invite</span>
            </a>
            <a href="#" class="btn btn-sm btn-dark ms-3 px-4 py-3" data-bs-toggle="modal"
                data-bs-target="#kt_modal_new_target">Create
                <span class="d-none d-sm-inline">Target</span></a>
        </div>
        <!--end::Actions-->
    </div>
    <!--end::Toolbar container-->
</div>
