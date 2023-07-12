"use strict";

// Class definition
var KTDatatablesServerSide = (function () {
    // Shared variables
    var dt;
    var url = $("#kt_datatable_example_1").attr("action");
    var urlForm = $("#open_permission_modal_id").attr("action");
    // var t, e, n;
    var e;
    const modalDiv = document.getElementById("kt_modal_add_permission"),
    modal = new bootstrap.Modal(modalDiv);
    // console.log(urlForm);

    // Private functions
    var initDatatable = function () {
        dt = $("#kt_datatable_example_1").DataTable({
            language: {
                info: "Affichage de _START_ - _END_ sur _TOTAL_",
                infoEmpty: "Aucune donnée disponible",
                search: "Rechercher:",
                processing: "Chargement...",
                paginate: {
                    first: "Premier",
                    last: "Dernier",
                    next: "Suivant",
                    previous: "Précédent",
                },
                zeroRecords: "Aucun enregistrement trouvé",
                loadingRecords: "Chargement...",
                buttons: {
                    colvis: "Visibilité",
                },
            },
            searchDelay: 500,
            processing: true,
            serverSide: true,
            order: [[1, "desc"]],
            stateSave: true,
            select: {
                style: "multi",
                selector: 'td:first-child input[type="checkbox"]',
                className: "row-selected",
            },
            ajax: {
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr(
                        "content"
                    ),
                },
                type: "POST",
                dataType: "json",
                // data: function(d) {
                //     d.status = statusID;
                // },
                url: url,
            },
            columns: [{ data: "name" }, { data: null }],
            columnDefs: [
                {
                    targets: 0,
                    // data: null,
                    // orderable: false,
                    // className: "text-center",
                    render: function (data) {
                        return `
                            <a href="#" class="">
                            ${data.toUpperCase()}
                            </a>
                        `;
                    },
                },
                {
                    targets: -1,
                    data: null,
                    orderable: false,
                    className: "text-center",
                    render: function (data, type, row) {
                        return `
                            <a href="#" class="" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">
                                <i class="ki-outline ki-setting-3 fs-3"></i>
                            </a>
                            <!--begin::Menu-->
                            <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4" data-kt-menu="true">
                                <!--begin::Menu item-->
                                <div class="menu-item px-3">
                                    <a href="javascript:;" class="menu-link px-3 open_permission_modal" data-row-id="${data.id}" data-bs-toggle="modal" data-bs-target="#kt_modal_add_permission" action="${urlForm}">Modifier</a>
                                </div>
                                <!--end::Menu item-->

                                <!--begin::Menu item-->
                                <div class="menu-item px-3">
                                    <a href="javascript:;" class="menu-link px-3" data-row-id="${data.id}">Suprimer</a>
                                </div>
                                <!--end::Menu item-->
                            </div>
                            <!--end::Menu-->
                        `;
                    },
                },
            ],
        });

        // Re-init functions on every table re-draw -- more info: https://datatables.net/reference/event/draw
        dt.on("draw", function () {
            KTMenu.createInstances();
        });
    };

    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
    var handleSearchDatatable = function () {
        const filterSearch = document.querySelector(
            '[data-kt-permissions-table-filter="search"]'
        );
        filterSearch.addEventListener("keyup", function (e) {
            dt.search(e.target.value).draw();
        });
    };

    // Open modal
    $(document).on("click", `.open_permission_modal`, function () {
        // set ajax request
        $.ajax({
            // AJAX Call options
            url: $(this).attr("action"),
            type: "POST",
            data: {
                dataRowID: $(this).attr("data-row-id"),
            },
            // CSRF verification
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
            // On 'Success' Event
            success: function (data) {
                // Process only if any data has been loaded
                if (data) {
                    $(
                        `#kt_modal_add_permission #kt_modal_add_permission_content`
                    ).html(data);
                } // End if
                 e = modalDiv.querySelector(
                            "#kt_modal_add_permission #permissionFormID"
                        )
                // (t = document.getElementById("kt_modal_add_permission")),
                //     (e = t.querySelector(
                //         "#kt_modal_add_permission #permissionFormID"
                //     )),
                //     (n = new bootstrap.Modal(t));

                formValidation();
            }, // End success event
        });
    });

    var formValidation = () => {
        var o = FormValidation.formValidation(e, {
            fields: {
                name: {
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
        modalDiv
            .querySelector('[data-kt-permissions-modal-action="close"]')
            .addEventListener("click", (t) => {
                t.preventDefault(),
                    Swal.fire({
                        text: "Êtes-vous sûr de vouloir fermer?",
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
                        modalDiv.value && modal.hide();
                    });
            }),
            modalDiv
                .querySelector('[data-kt-permissions-modal-action="cancel"]')
                .addEventListener("click", (modalDiv) => {
                    modalDiv.preventDefault(),
                        Swal.fire({
                            text: "Êtes-vous sûr de vouloir annuler ?",
                            icon: "warning",
                            showCancelButton: !0,
                            buttonsStyling: !1,
                            confirmButtonText: "Oui, annulez !",
                            cancelButtonText: "Non, retourner",
                            customClass: {
                                confirmButton: "btn btn-primary",
                                cancelButton: "btn btn-active-light",
                            },
                        }).then(function (modalDiv) {
                            modalDiv.value
                                ? (e.reset(), modal.hide())
                                : "cancel" === modalDiv.dismiss &&
                                  Swal.fire({
                                      text: "Votre formulaire n'a pas été annulé !.",
                                      icon: "error",
                                      buttonsStyling: !1,
                                      confirmButtonText: "Ok, got it!",
                                      customClass: {
                                          confirmButton: "btn btn-primary",
                                      },
                                  });
                        });
                });

        const i = modalDiv.querySelector(
            '[data-kt-permissions-modal-action="submit"]'
        );

        i.addEventListener("click", function (modalDiv) {
            modalDiv.preventDefault(),
                o &&
                    o.validate().then(function (modalDiv) {
                        i.setAttribute("data-kt-indicator", "on"),
                            (i.disabled = !0);
                        let formElement = $(`#permissionFormID`),
                            formData = new FormData(formElement[0]);
                        formData.append(
                            "_token",
                            $('meta[name="csrf-token"]').attr("content")
                        ); // Ajoute le jeton CSRF au FormData

                        $.ajax({
                            url: $("#submitPermission").attr("action"), // URL de la route de connexion
                            type: "POST",
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (response) {
                                var data = JSON.parse(response);
                                if (data.success) {
                                    // hide modal
                                    modal.hide();

                                    toastr.success(data.message);
                                    dt.draw();

                                } // end if
                                else {
                                    toastr.error(data.message);
                                    i.removeAttribute("data-kt-indicator"),(i.disabled = !1)
                                }
                            },
                            error: function (xhr, status, error) {
                            },
                        });

                        // "Valid" == modalDiv
                        //                 ? (i.setAttribute(
                        //                       "data-kt-indicator",
                        //                       "on"
                        //                   ),
                        //                   (i.disabled = !0),
                        //                   setTimeout(function () {
                        //                       i.removeAttribute(
                        //                           "data-kt-indicator"
                        //                       ),
                        //                           (i.disabled = !1),
                        //                           Swal.fire({
                        //                               text: "Form has been successfully submitted!",
                        //                               icon: "success",
                        //                               buttonsStyling: !1,
                        //                               confirmButtonText:
                        //                                   "Ok, got it!",
                        //                               customClass: {
                        //                                   confirmButton:
                        //                                       "btn btn-primary",
                        //                               },
                        //                           }).then(function (t) {
                        //                               t.isConfirmed && n.hide();
                        //                           });
                        //                   }, 2e3))
                        //                 : Swal.fire({
                        //                       text: "Sorry, looks like there are some errors detected, please try again.",
                        //                       icon: "error",
                        //                       buttonsStyling: !1,
                        //                       confirmButtonText: "Ok, got it!",
                        //                       customClass: {
                        //                           confirmButton:
                        //                               "btn btn-primary",
                        //                       },
                        //                   });
                    });
        });
    };

    // Public methods
    return {
        init: function () {
            initDatatable();
            handleSearchDatatable();
        },
    };
})();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTDatatablesServerSide.init();
});
