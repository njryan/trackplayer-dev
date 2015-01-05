var pageSession = new ReactiveDict();

Template.AdsDetails.rendered = function() {
	
};

Template.AdsDetails.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.AdsDetails.helpers({
	
});

Template.AdsDetailsDetailsForm.rendered = function() {
	

	pageSession.set("adsDetailsDetailsFormInfoMessage", "");
	pageSession.set("adsDetailsDetailsFormErrorMessage", "");

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

Template.AdsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adsDetailsDetailsFormInfoMessage", "");
		pageSession.set("adsDetailsDetailsFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("adsDetailsDetailsFormInfoMessage", "Saved.");
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			pageSession.set("adsDetailsDetailsFormErrorMessage", "Error. " + msg);
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

		Router.go("ads", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("ads", {});
	}

	
});

Template.AdsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adsDetailsDetailsFormErrorMessage");
	}
	
});
