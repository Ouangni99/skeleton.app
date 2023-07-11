"use strict";
var KTSigninGeneral = (function () {
    var e, t, i;
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
    return {
        init: function () {
            (e = document.querySelector("#loginForm")),
                (t = document.querySelector("#loginFormSubmitBTN")),
                (i = FormValidation.formValidation(e, {
                    fields: {
                        email: {
                            validators: {
                                regexp: {
                                    regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message:
                                        "La valeur n'est pas une adresse électronique valide",
                                },
                                notEmpty: {
                                    message:
                                        "L'adresse électronique est requise",
                                },
                            },
                        },
                        password: {
                            validators: {
                                notEmpty: {
                                    message: "Le mot de passe est obligatoire",
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
                })),
                t.addEventListener("click", function (n) {
                    n.preventDefault(),
                        i.validate().then(function (i) {

                            t.setAttribute("data-kt-indicator", "on"),(t.disabled = !0)
                            let formElement = $(`#loginForm`),
                                formData = new FormData(formElement[0]);
                            formData.append(
                                "_token",
                                $('meta[name="csrf-token"]').attr("content")
                            ); // Ajoute le jeton CSRF au FormData

                            $.ajax({
                                url: $('#loginForm').attr('action'), // URL de la route de connexion
                                type: "POST",
                                data: formData,
                                processData: false,
                                contentType: false,
                                success: function (response) {
                                    // Vous pouvez rediriger l'utilisateur ou effectuer d'autres actions ici
                                    if (response.success) {
                                        toastr.success('Connexion réussie');
                                        // Authentification réussie, effectuer des actions supplémentaires
                                        (e.querySelector('[name="email"]').value = ""),(e.querySelector('[name="password"]').value = "");
                                        var i = e.getAttribute("data-kt-redirect-url");
                                        i && (location.href = i);
                                    }// end if
                                    else{
                                        t.removeAttribute("data-kt-indicator"),(t.disabled = !1)
                                        toastr.error(response.errors.email);
                                    }
                                },
                                error: function (xhr, status, error) {
                                    // Vous pouvez afficher un message d'erreur ou effectuer d'autres actions ici
                                    var errors = xhr.responseJSON.errors;

                                    // Verifier la taille de l'objet
                                    var size = Object.keys(errors).length;

                                    if(size > 1){
                                        t.removeAttribute("data-kt-indicator"),(t.disabled = !1)
                                        // Afficher les erreurs dans l'interface utilisateur
                                        for (var key in errors) {
                                            if (errors.hasOwnProperty(key)) {
                                                var errorMessages = errors[key].join(", ");
                                                // Afficher les messages d'erreur à l'emplacement souhaité dans votre interface utilisateur
                                                toastr.error(
                                                    key + ": " + errorMessages
                                                );
                                            }
                                        }
                                    }// end if
                                    else{
                                        toastr.error(errors.email
                                        );
                                    }
                                },
                            });
                        });
                });
        },
    };
})();
KTUtil.onDOMContentLoaded(function () {
    KTSigninGeneral.init();
});
