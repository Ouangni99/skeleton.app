<x-authentification.seleton>
    <div class="w-lg-500px p-10">
        <!--begin::Form-->
        <form class="form w-100" novalidate="novalidate" id="loginForm" data-kt-redirect-url="{{ route('dashboard') }}" action = {{ route('store.login') }} method="POST">
            <!--begin::Heading-->
            <div class="text-center mb-11">
                <!--begin::Title-->
                <h1 class="text-dark mb-3 text-uppercase">Se connecter</h1>
                <!--end::Title-->
                <!--begin::Subtitle-->
                <div class="text-gray-500 fw-semibold fs-6">Vos informations de connexion</div>
                <!--end::Subtitle=-->
            </div>
            <!--begin::Heading-->
            <!--begin::Input group=-->
            <div class="fv-row mb-8">
                <!--begin::Email-->
                <input type="text" placeholder="Email" name="email" autocomplete="off"
                    class="form-control bg-transparent" />
                <!--end::Email-->
            </div>
            <!--end::Input group=-->
            <div class="fv-row mb-3">
                <!--begin::Password-->
                <input type="password" placeholder="Mot de passe" name="password" autocomplete="off"
                    class="form-control bg-transparent" />
                <!--end::Password-->
            </div>
            <!--end::Input group=-->
            <!--begin::Wrapper-->
            <div class="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                <div></div>
                <!--begin::Link-->
                <a href="javascript:;"
                    class="link-primary">Mot de passe oublié ?</a>
                <!--end::Link-->
            </div>
            <!--end::Wrapper-->
            <!--begin::Submit button-->
            <div class="d-grid mb-10">
                <button type="submit" id="loginFormSubmitBTN" class="btn btn-primary">
                    <!--begin::Indicator label-->
                    <span class="indicator-label">Se connecter</span>
                    <!--end::Indicator label-->
                    <!--begin::Indicator progress-->
                    <span class="indicator-progress">Veuillez patienter...
                        <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                    <!--end::Indicator progress-->
                </button>
            </div>
            <!--end::Submit button-->
            <!--begin::Sign up-->
            <div class="text-gray-500 text-center fw-semibold fs-6">Pas encore membre ?
                <a href="javascript:;" class="link-primary">S'inscrire</a>
            </div>
            <!--end::Sign up-->
        </form>
        <!--end::Form-->
    </div>
</x-authentification.seleton>
