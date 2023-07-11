"use strict";

$(function () {
    // Handler for .ready() called.
    $(`.open_permission_modal`).on("click", function () {
        // alert('DKSODK')

        console.log($(this).attr('action'));

        // set ajax request
        $.ajax({
            // AJAX Call options
            url: $(this).attr('action'),
            type: "POST",
            data: {
                dataRowID: $(this).attr('data-row-id'),
            },
            // CSRF verification
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            },
            // On 'Success' Event
            success: function(data) {
                // Process only if any data has been loaded
                if(data) {
                    $(`#kt_modal_add_permission #kt_modal_add_permission_content`).html(data);
                } // End if
            }, // End success event

        });
    });

});
