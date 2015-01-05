var pageSession = new ReactiveDict();

Template.SongsDetails.rendered = function() {
	
};

Template.SongsDetails.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.SongsDetails.helpers({
	
});

Template.SongsDetailsDetailsForm.rendered = function() {
	

	pageSession.set("songsDetailsDetailsFormInfoMessage", "");
	pageSession.set("songsDetailsDetailsFormErrorMessage", "");

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

Template.SongsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("songsDetailsDetailsFormInfoMessage", "");
		pageSession.set("songsDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("songsDetailsDetailsFormInfoMessage", "Saved.");
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			pageSession.set("songsDetailsDetailsFormErrorMessage", "Error. " + msg);
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

		Router.go("songs", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("songs", {});
	}

	
});

Template.SongsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("songsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("songsDetailsDetailsFormErrorMessage");
	}
	
});
