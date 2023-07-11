"use strict";

// Class definition
var KTDatatablesServerSide = (function () {
    // Shared variables
    var dt;
    var url = $("#kt_datatable_example_1").attr("action");
    var urlForm = $("#open_permission_modal_id").attr("action");
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

    // $(`.open_permission_modal`).on("click", function () {
    //     // alert('DKSODK')

    //     console.log($(this).attr("action"));

    //     // set ajax request
    //     $.ajax({
    //         // AJAX Call options
    //         url: $(this).attr("action"),
    //         type: "POST",
    //         data: {
    //             dataRowID: $(this).attr("data-row-id"),
    //         },
    //         // CSRF verification
    //         headers: {
    //             "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    //         },
    //         // On 'Success' Event
    //         success: function (data) {
    //             // Process only if any data has been loaded
    //             if (data) {
    //                 $(
    //                     `#kt_modal_add_permission #kt_modal_add_permission_content`
    //                 ).html(data);
    //             } // End if
    //         }, // End success event
    //     });
    // });

    $(document).on("click", `.open_permission_modal`, function () {
        console.log($(this).attr("action"));

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
            }, // End success event
        });
    });

    // Filter Datatable
    // var handleFilterDatatable = () => {
    //     // Select filter options
    //     filterPayment = document.querySelectorAll(
    //         '[data-kt-permissions-table-filter="payment_type"] [name="payment_type"]'
    //     );
    //     const filterButton = document.querySelector(
    //         '[data-kt-permissions-table-filter="filter"]'
    //     );

    //     // Filter datatable on submit
    //     filterButton.addEventListener("click", function () {
    //         // Get filter values
    //         let paymentValue = "";

    //         // Get payment value
    //         filterPayment.forEach((r) => {
    //             if (r.checked) {
    //                 paymentValue = r.value;
    //             }

    //             // Reset payment value if "All" is selected
    //             if (paymentValue === "all") {
    //                 paymentValue = "";
    //             }
    //         });

    //         // Filter datatable --- official docs reference: https://datatables.net/reference/api/search()
    //         dt.search(paymentValue).draw();
    //     });
    // };

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
