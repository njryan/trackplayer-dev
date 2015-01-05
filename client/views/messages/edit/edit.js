var pageSession = new ReactiveDict();

Template.MessagesEdit.rendered = function() {
	
};

Template.MessagesEdit.events({
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("", {});
	}

	
});

Template.MessagesEdit.helpers({
	
});

Template.MessagesEditEditForm.rendered = function() {
	

	pageSession.set("messagesEditEditFormInfoMessage", "");
	pageSession.set("messagesEditEditFormErrorMessage", "");

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

Template.MessagesEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("messagesEditEditFormInfoMessage", "");
		pageSession.set("messagesEditEditFormErrorMessage", "");
		
		var self = this;

		function submitAction() {
			if(!t.find("#form-cancel-button")) {
				pageSession.set("messagesEditEditFormInfoMessage", "Saved.");
			}

			Router.go("messages", {});
		}

		function errorAction(msg) {
			pageSession.set("messagesEditEditFormErrorMessage", "Error. " + msg);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Messages.update({ _id: t.data.message._id }, { $set: values }, function(e) { if(e) errorAction(e.message); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("messages", {});
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

Template.MessagesEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("messagesEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("messagesEditEditFormErrorMessage");
	}
	
});
