
spolServices
.factory("loginService", function($location, $rootScope) {

	var loggedInId = null;
	var actualRedirect = null;

	var _validLogins = [
		{id: 1, username: 'gmisiolek', password: 'test', admin: 1},
		{id: 2, username: 'kturczynski', password: 'test', admin: 0},
		{id: 3, username: 'hub', password: 'test', admin: 1},
		{id: 4, username: 'user', password: 'test', admin: 0},
		{id: 5, username: 'stefan', password: 'test', admin: 0}
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

	var isAdmin = function(id) {
        if(id == undefined || id == null){
            return false;
        }
		var uid = id.split(":")[0];
        var testLogin;
		for (var i = 0; i < _validLogins.length; i++) {
			var testLogin = _validLogins[i];
			if (testLogin.id == uid) {
				break;
			}
		}
        if(testLogin != undefined && testLogin.admin == 1){
            return true;
        }
		return false;
	};

	var getUsernameById = function(id) {
        if(id != null && id != undefined){
            var uid = id.split(":")[0];
            for (var i = 0; i < _validLogins.length; i++) {
                var testLogin = _validLogins[i];
                if (testLogin.id == uid) {
                    return testLogin.username;
                }
            }
        }
		return null;
	};

	var getLoggedInId = function() {
		if (!loggedInId) return null;
		return loggedInId + ":" + getFingerprint();
	};

	var getUsernameLogged = function() {
		return getUsernameById(getLoggedInId());
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
				$rootScope.$broadcast("doLogin");
				if (actualRedirect) $location.path(actualRedirect); else $location.path("/tickets");
				actualRedirect = null;
				return true;
			}
		}
		return false;
	};

	var doLogout = function() {
		loggedInId = null;
		localStorage.removeItem("spolLogin");
		$rootScope.$broadcast("flashMessage", "Wylogowano pomyślnie");
		$location.path("/");
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
        getUsernameById: getUsernameById,
        getUsernameLogged: getUsernameLogged,
        isAdmin: isAdmin
	};
});