
spolServices
.factory("loginService", function($location) {

	var loggedInId = null;
	var actualRedirect = null;

	var _validLogins = [
		{id: 1, username: 'test', password: 'test', admin: 0},
		{id: 2, username: 'test2', password: 'test2', admin: 0},
		{id: 3, username: 'admin', password: 'admin', admin: 1}
	];

	var hashCode = function(str) {
	  var hash = 0, i, chr, len;
	  if (!str) return 0;
	  if (str.length == 0) return hash;
	  for (i = 0, len = str.length; i < len; i++) {
	    chr   = str.charCodeAt(i);
	    hash  = ((hash << 5) - hash) + chr;
	    hash |= 0; 
	  }
	  return hash;
	};

	var checkLogin = function() {
		var localLogin = localStorage.getItem("spolLogin");
		if (!localStorage.getItem("spolLogin")) return null;
		for (var i = 0; i < _validLogins.length; i++) {
			var testLogin = _validLogins[i];
			if (hashCode(testLogin.username+testLogin.password) == localLogin) {
				loggedInId = testLogin.id;
				return testLogin.username;
			}
		}
		return null;
	};

	var getUsernameById = function(id) {
		var uid = id.split(":")[0];
		for (var i = 0; i < _validLogins.length; i++) {
			var testLogin = _validLogins[i];
			if (testLogin.id == uid) {
				return testLogin.username;
			}
		}
		return null;
	};

	var getLoggedInId = function() {
		if (!loggedInId) return null;
		return loggedInId + ":" + getFingerprint();
	};

	var redirectLogin = function() {
		if (getLoggedInId()) return;
		actualRedirect = $location.path();
		$location.path("/login");
	};

	var doLogin = function(username, password) {
		for (var i = 0; i < _validLogins.length; i++) {
			var testLogin = _validLogins[i];
			if (testLogin.username == username && testLogin.password == password) {
				localStorage.setItem("spolLogin", hashCode(testLogin.username+testLogin.password));
				loggedInId = testLogin.id;
				if (actualRedirect) $location.path(actualRedirect);
				actualRedirect = null;
				return true;
			}
		}
		return false;
	};

	var doLogout = function() {
		loggedInId = null;
		localStorage.removeItem("spolLogin");
	};

	var getFingerprint = function() {
		var hash = 0;
		for(plugin in navigator.plugins) {
			hash += hashCode(navigator.plugins[plugin].filename);
		}
		return hash % 16384;
	};

	checkLogin();

	return {
		getFingerprint: getFingerprint,
		doLogin: doLogin,
		checkLogin: checkLogin,
		doLogout: doLogout,
		getLoggedInId: getLoggedInId,
		redirectLogin: redirectLogin,
        getUsernameById: getUsernameById
	};
});