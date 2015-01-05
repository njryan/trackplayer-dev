var pageSession = new ReactiveDict();

Template.RequestsInsert.rendered = function() {
	
};

Template.RequestsInsert.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.RequestsInsert.helpers({
	
});

Template.RequestsInsertInsertForm.rendered = function() {
	

	pageSession.set("requestsInsertInsertFormInfoMessage", "");
	pageSession.set("requestsInsertInsertFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();			
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[autofocus]").focus();
};

Template.RequestsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("requestsInsertInsertFormInfoMessage", "");
		pageSession.set("requestsInsertInsertFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("requestsInsertInsertFormInfoMessage", "Saved.");
			}

			Router.go("requests", {});
		}

		function errorAction(msg) {
			pageSession.set("requestsInsertInsertFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Requests.insert(values, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("requests", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.RequestsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("requestsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("requestsInsertInsertFormErrorMessage");
	}
	
});
