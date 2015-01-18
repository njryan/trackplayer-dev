var pageSession = new ReactiveDict();

Template.DashboardProfile.rendered = function() {
	
};

Template.DashboardProfile.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.DashboardProfile.helpers({
	
});

Template.DashboardProfileEditForm.rendered = function() {
	

	pageSession.set("DashboardProfileEditFormInfoMessage", "");
	pageSession.set("DashboardProfileEditFormErrorMessage", "");

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

Template.DashboardProfileEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("DashboardProfileEditFormInfoMessage", "");
		pageSession.set("DashboardProfileEditFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("DashboardProfileEditFormInfoMessage", "Saved.");
			}

			Router.go("dashboard.profile", {});
		}

		function errorAction(msg) {
			pageSession.set("DashboardProfileEditFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("updateUserAccount", t.data.current_user_data._id, values, function(e) { if(e) errorAction(e.message); else submitAction(); });
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

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.DashboardProfileEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("DashboardProfileEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("DashboardProfileEditFormErrorMessage");
	}
	
});
