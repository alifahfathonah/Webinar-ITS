var unitTableElm = $('#unitTable');
// Setup - add a text input to each footer cell
var types = unitTableElm.data('types');
$.each(types, function() {
	$('#searchTypeSelect')
		.append($("<option></option>")
		.val(this.id)
		.text(this.nama));
});

// DataTable
var editButton = $('#editBtnTemplate');
var deleteButton = $('#deleteBtnTemplate');
unitTableElm.DataTable({
	processing: true,
	serverSide: true,
	ajax: unitTableElm.data('ajaxurl'),
	deferLoading: unitTableElm.data("length"),
	columnDefs:[
		{
			"targets": 0,
			"data": "id",
			"name": null,
			"searchable": false,
			"visible": false,
		},
		{
			"targets": 1,
			"title": "Nama Unit",
			"data": "nama",
			"name": "units.nama",
			"searchable": true,
			"visible": true,
		},
		{
			"targets": 2,
			"title": "Tipe Unit",
			"data": "unit_type",
			"name": "unit_types.id",
			"searchable": true,
			"visible": true,
		},
		{
			"targets": 3, 
			"title": "Edit",
			"data": null,
			"name": null,
			"searchable": false,
			"visible": true,
			"render": function (data, type, full, meta) {
				return editButton.createButton(full.id).html();
			}
		},
		{
			"targets": 4, 
			"title": "Delete",
			"data": null,
			"name": null,
			"searchable": false,
			"visible": true,
			"render": function (data, type, full, meta) {
				return deleteButton.createButton(full.id).html();
			}
		}
	],
	initComplete: function () {
		// Apply the search
		this.api().columns().every( function () {
			var column = this;
			$('input', this.footer()).on('keyup change clear', $.debounce(250, true, function(e) {
				if (column.search() !== this.value) {
					column.search(this.value).draw();
				}
			}));

			$('select', this.footer()).on('change', function () {
				// let val = $.fn.dataTable.util.escapeRegex($(this).val());
				let val = $(this).val();
				// column.search( val ? '^'+val+'$' : '', true, false ).draw();
				column.search(val, false, false, true).draw();
			});
		});
	}
});

function checkEmpty() {
	let unitTypeSelElm = document.getElementById('unitType');
	if (unitTypeSelElm.value == "") {
		alert("Mohon pilih tipe unit");
		return;
	}
	document.getElementById('submitForm').submit();

}