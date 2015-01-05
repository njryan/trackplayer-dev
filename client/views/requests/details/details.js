var pageSession = new ReactiveDict();

Template.RequestsDetails.rendered = function() {
	
};

Template.RequestsDetails.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.RequestsDetails.helpers({
	
});

Template.RequestsDetailsDetailsForm.rendered = function() {
	

	pageSession.set("requestsDetailsDetailsFormInfoMessage", "");
	pageSession.set("requestsDetailsDetailsFormErrorMessage", "");

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

Template.RequestsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("requestsDetailsDetailsFormInfoMessage", "");
		pageSession.set("requestsDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("requestsDetailsDetailsFormInfoMessage", "Saved.");
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			pageSession.set("requestsDetailsDetailsFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("requests", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("requests", {});
	}

	
});

Template.RequestsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("requestsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("requestsDetailsDetailsFormErrorMessage");
	}
	
});
