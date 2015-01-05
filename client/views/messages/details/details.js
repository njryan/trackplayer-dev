var pageSession = new ReactiveDict();

Template.MessagesDetails.rendered = function() {
	
};

Template.MessagesDetails.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.MessagesDetails.helpers({
	
});

Template.MessagesDetailsDetailsForm.rendered = function() {
	

	pageSession.set("messagesDetailsDetailsFormInfoMessage", "");
	pageSession.set("messagesDetailsDetailsFormErrorMessage", "");

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

Template.MessagesDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("messagesDetailsDetailsFormInfoMessage", "");
		pageSession.set("messagesDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("messagesDetailsDetailsFormInfoMessage", "Saved.");
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			pageSession.set("messagesDetailsDetailsFormErrorMessage", "Error. " + msg);
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

		Router.go("messages", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("messages", {});
	}

	
});

Template.MessagesDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("messagesDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("messagesDetailsDetailsFormErrorMessage");
	}
	
});
