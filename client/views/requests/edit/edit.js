var pageSession = new ReactiveDict();

Template.RequestsEdit.rendered = function() {
	
};

Template.RequestsEdit.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.RequestsEdit.helpers({
	
});

Template.RequestsEditEditForm.rendered = function() {
	

	pageSession.set("requestsEditEditFormInfoMessage", "");
	pageSession.set("requestsEditEditFormErrorMessage", "");

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

Template.RequestsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("requestsEditEditFormInfoMessage", "");
		pageSession.set("requestsEditEditFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("requestsEditEditFormInfoMessage", "Saved.");
			}

			Router.go("requests", {});
		}

		function errorAction(msg) {
			pageSession.set("requestsEditEditFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Requests.update({ _id: t.data.request._id }, { $set: values }, function(e) { if(e) errorAction(e.message); else submitAction(); });
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

Template.RequestsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("requestsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("requestsEditEditFormErrorMessage");
	}
	
});
