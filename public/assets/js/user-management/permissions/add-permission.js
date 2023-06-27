"use strict";
var KTUsersAddPermission = (function () {
    toastr.options = {
        closeButton: true,
        debug: false,
        newestOnTop: false,
        progressBar: true,
        positionClass: "toastr-top-right",
        preventDuplicates: true,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
    };
    const t = document.getElementById("kt_modal_add_permission"),
        e = t.querySelector("#kt_modal_add_permission_form"),
        n = new bootstrap.Modal(t);
    return {
        init: function () {
            (() => {
                var o = FormValidation.formValidation(e, {
                    fields: {
                        permission_name: {
                            validators: {
                                notEmpty: {
                                    message: "Le nom de la permission est requis",
                                },
                            },
                        },
                    },
                    plugins: {
                        trigger: new FormValidation.plugins.Trigger(),
                        bootstrap: new FormValidation.plugins.Bootstrap5({
                            rowSelector: ".fv-row",
                            eleInvalidClass: "",
                            eleValidClass: "",
                        }),
                    },
                });
                t.querySelector('[data-kt-permissions-modal-action="close"]')
                    .addEventListener("click", (t) => {
                        t.preventDefault(),
                            Swal.fire({
                                text: "Êtes-vous sûr de vouloir fermer ?",
                                icon: "warning",
                                showCancelButton: !0,
                                buttonsStyling: !1,
                                confirmButtonText: "Oui, fermer !",
                                cancelButtonText: "Non, retourner",
                                customClass: {
                                    confirmButton: "btn btn-primary",
                                    cancelButton: "btn btn-active-light",
                                },
                            }).then(function (t) {
                                t.value && n.hide();
                            });
                    }),
                    t.querySelector('[data-kt-permissions-modal-action="cancel"]')
                        .addEventListener("click", (t) => {
                            t.preventDefault(),
                                Swal.fire({
                                    text: "Êtes-vous sûr de vouloir annuler ?",
                                    icon: "warning",
                                    showCancelButton: !0,
                                    buttonsStyling: !1,
                                    confirmButtonText: "Oui, l'annuler !",
                                    cancelButtonText: "Non, retourner",
                                    customClass: {
                                        confirmButton: "btn btn-primary",
                                        cancelButton: "btn btn-active-light",
                                    },
                                }).then(function (t) {
                                    t.value
                                        ? (e.reset(), n.hide())
                                        : "cancel" === t.dismiss &&
                                          Swal.fire({
                                              text: "Votre formulaire n'a pas été annulé !.",
                                              icon: "error",
                                              buttonsStyling: !1,
                                              confirmButtonText: "Ok, got it!",
                                              customClass: {
                                                  confirmButton:
                                                      "btn btn-primary",
                                              },
                                          });
                                });
                        });
                const i = t.querySelector('[data-kt-permissions-modal-action="submit"]');
                i.addEventListener("click", function (t) {
                    t.preventDefault(), o && o.validate().then(function (t) {
                                console.log("validated!"),
                                    "Valid" == t ? (i.setAttribute( "data-kt-indicator","on"), (i.disabled = !0),

                                        setTimeout(function () {
                                              i.removeAttribute("data-kt-indicator"),(i.disabled = !1),
                                                  Swal.fire({
                                                      text: "Form has been successfully submitted!",
                                                      icon: "success",
                                                      buttonsStyling: !1,
                                                      confirmButtonText:
                                                          "Ok, got it!",
                                                      customClass: {
                                                          confirmButton:
                                                              "btn btn-primary",
                                                      },
                                                  }).then(function (t) {
                                                      t.isConfirmed && n.hide();
                                                  });
                                        }, 2e3)

                                        )
                                        :toastr.error('errors.email')
                                        ;
                            });
                });
            })();
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTUsersAddPermission.init();
});
