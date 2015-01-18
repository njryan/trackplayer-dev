Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

if(Meteor.isClient) {
	var publicRoutes = ["home_public", "login", "register", "forgot_password", "reset_password"];
	var privateRoutes = ["home_private", "spotlight", "rez_radio", "ads", "ads.insert", "ads.details", "ads.edit", "songs", "songs.insert", "songs.details", "songs.edit", "new_messages", "messages.insert", "messages.details", "messages.edit", "requests", "requests.insert", "requests.details", "requests.edit", "admin", "admin.users", "admin.users.details", "admin.users.insert", "admin.users.edit", "dashboard", "dashboard.profile", "dashboard.change_pass", "logout", "dashboard"];
	var zonelessRoutes = [];

	var roleMap = [
		{route: "rez_radio", roles: ["admin", "user"]},
		{route: "ads", roles: ["admin", "user"]},
		{route: "ads.insert", roles: ["admin", "user"]},
		{route: "ads.details", roles: ["admin", "user"]},
		{route: "ads.edit", roles: ["admin", "user"]},
		{route: "songs", roles: ["admin", "user"]},
		{route: "songs.insert", roles: ["admin", "user"]},
		{route: "songs.details", roles: ["admin", "user"]},
		{route: "songs.edit", roles: ["admin", "user"]},
		{route: "new_messages", roles: ["admin", "user"]},
		{route: "messages.insert", roles: ["admin", "user"]},
		{route: "messages.details", roles: ["admin", "user"]},
		{route: "messages.edit", roles: ["admin", "user"]},
		{route: "requests", roles: ["admin", "user"]},
		{route: "requests.insert", roles: ["admin", "user"]},
		{route: "requests.details", roles: ["admin", "user"]},
		{route: "requests.edit", roles: ["admin", "user"]},
		{route: "admin", roles: ["admin"]},
		{route: "admin.users", roles: ["admin"]},
		{route: "admin.users.details", roles: ["admin"]},
		{route: "admin.users.insert", roles: ["admin"]},
		{route: "admin.users.edit", roles: ["admin"]},
		{route: "dashboard", roles: ["user", "admin"]},
		{route: "dashboard.profile", roles: ["user", "admin"]},
		{route: "dashboard.change_pass", roles: ["user", "admin"]},
		{route: "dashboard", roles: ["admin", "user"]}
	];

	this.firstGrantedRoute = function () {
		var grantedRoute = "";
		_.every(privateRoutes, function (route) {
			if (routeGranted(route)) {
				grantedRoute = route;
				return false;
			}
			return true;
		});

		if (grantedRoute == "") {
			if (routeGranted("home_private")) {
				return "home_private";
			} else {
				return "home_public";
			}
		}

		return grantedRoute;
	};

	// this function returns true if user is in role allowed to access given route
	this.routeGranted = function (routeName) {
		if (!routeName) {
			// route without name - enable access (?)
			return true;
		}

		if (!roleMap || roleMap.length === 0) {
			// this app don't have role map - enable access
			return true;
		}

		var roleMapItem = _.find(roleMap, function (roleItem) {
			return roleItem.route == routeName;
		});
		if (!roleMapItem) {
			// page is not restricted
			return true;
		}

		if (!Meteor.user() || !Meteor.user().roles) {
			// user is not logged in
			return false;
		}

		// this page is restricted to some role(s), check if user is in one of allowedRoles
		var allowedRoles = roleMapItem.roles;
		var granted = _.intersection(allowedRoles, Meteor.user().roles);
		return !(!granted || granted.length === 0);


	};

	// Subscribe this data for every user

	Meteor.subscribe("current_user_data");
	Meteor.subscribe("profiles");

	Router.ensureLogged = function () {
		if (!Meteor.user()) {
			// user is not logged in - redirect to public home
			this.redirect("home_public");

		} else {
			// user is logged in - check role
			if (!routeGranted(this.route.getName())) {
				// user is not in allowedRoles - redirect to private home
				var redirectRoute = firstGrantedRoute();
				this.redirect(redirectRoute);
				return;
			}
			this.next();
		}
	};

	Router.ensureNotLogged = function () {
		if (Meteor.user()) {
			var redirectRoute = firstGrantedRoute();
			this.redirect(redirectRoute);
		}
		else
			this.next();
	};

	Router.onBeforeAction(function () {
		// loading indicator here
		if (!this.ready()) {
			$("body").addClass("wait");
		} else {
			$("body").removeClass("wait");
			this.next();
		}
	});

	Router.onBeforeAction(Router.ensureNotLogged, {only: publicRoutes});
	Router.onBeforeAction(Router.ensureLogged, {only: privateRoutes});

	// Add SEO title, meta, and og properly on route load.
	Router.onAfterAction(function () {
		if (!Meteor.isClient) {
			return;
		}
		//post = getData();
		var seoRouterName = Router.current().route.getName();
		SEO.set({
			title: seoRouterName,
			meta: {
				'description': seoRouterName
			},
			og: {
				'title': seoRouterName,
				'description': seoRouterName
			}
		});
	});
}


Router.map(function () {

	this.route("home_public", {path: "/", controller: "HomePublicController"});
	this.route("login", {path: "/login", controller: "LoginController"});
	this.route("register", {path: "/register", controller: "RegisterController"});
	this.route("forgot_password", {path: "/forgot_password", controller: "ForgotPasswordController"});
	this.route("reset_password", {path: "/reset_password/:resetPasswordToken", controller: "ResetPasswordController"});
	this.route("home_private", {path: "/home_private", controller: "HomePrivateController"});
	this.route("spotlight", {path: "/spotlight", controller: "SpotlightController"});
	this.route("rez_radio", {path: "/rez_radio", controller: "RezRadioController"});
	this.route("ads", {path: "/ads", controller: "AdsController"});
	this.route("ads.insert", {path: "/ads/insert", controller: "AdsInsertController"});
	this.route("ads.details", {path: "/ads/details/:adId", controller: "AdsDetailsController"});
	this.route("ads.edit", {path: "/ads/edit/:adId", controller: "AdsEditController"});
	this.route("songs", {path: "/songs", controller: "SongsController"});
	this.route("songs.insert", {path: "/songs/insert", controller: "SongsInsertController"});
	this.route("songs.details", {path: "/songs/details/:songId", controller: "SongsDetailsController"});
	this.route("songs.edit", {path: "/songs/edit/:songId", controller: "SongsEditController"});
	this.route("new_messages", {path: "/new_messages", controller: "NewMessagesController"});
	this.route("messages.insert", {path: "/messages/insert", controller: "MessagesInsertController"});
	this.route("messages.details", {path: "/messages/details/:messageId", controller: "MessagesDetailsController"});
	this.route("messages.edit", {path: "/messages/edit/:messageId", controller: "MessagesEditController"});
	this.route("requests", {path: "/requests", controller: "RequestsController"});
	this.route("requests.insert", {path: "/requests/insert", controller: "RequestsInsertController"});
	this.route("requests.details", {path: "/requests/details/:requestId", controller: "RequestsDetailsController"});
	this.route("requests.edit", {path: "/requests/edit/:requestId", controller: "RequestsEditController"});
	this.route("admin", {path: "/admin", controller: "AdminController"});
	this.route("admin.users", {path: "/admin/users", controller: "AdminUsersController"});
	this.route("admin.users.details", {path: "/admin/users/details/:userId", controller: "AdminUsersDetailsController"});
	this.route("admin.users.insert", {path: "/admin/users/insert", controller: "AdminUsersInsertController"});
	this.route("admin.users.edit", {path: "/admin/users/edit/:userId", controller: "AdminUsersEditController"});
	this.route("dashboard.profile", {path: "/dashboard/profile", controller: "DashboardProfileController"});
	this.route("dashboard.change_pass", {path: "/dashboard/change_pass", controller: "DashboardChangePassController"})
	this.route("dashboard", {path: "/dashboard", controller: "DashboardController"});
	this.route("logout", {path: "/logout", controller: "LogoutController"});/*ROUTER_MAP*/
});
