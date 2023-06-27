"use strict";

// Class definition
var KTDatatablesServerSide = (function () {
    // Shared variables
    var dt;

    // Private functions
    var initDatatable = function () {
        dt = $("#kt_datatable_example_1").DataTable({
            searchDelay: 500,
            processing: true,
            serverSide: true,
            order: [[2, "desc"]],
            stateSave: true,
            select: {
                style: "multi",
                selector: 'td:first-child input[type="checkbox"]',
                className: "row-selected",
            },
            ajax: {
                url: "https://preview.keenthemes.com/api/datatables.php",
            },
            columns: [
                { data: "Name" },
                { data: "Email" },
                { data: "Company" },
                { data: null },
            ],
            columnDefs: [
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
                                    <a href="#" class="menu-link px-3">Edit
                                    </a>
                                </div>
                                <!--end::Menu item-->

                                <!--begin::Menu item-->
                                <div class="menu-item px-3">
                                    <a href="#" class="menu-link px-3">
                                        Delete
                                    </a>
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
