const parseCookies = (req, res, next) => {
  if (req.headers.cookie) {
    var cookie = {};
    var cookies = req.headers.cookie.split('; ');

    for (var i = 0; i < cookies.length; i++) {
      var cookieName = cookies[i].split('=')[0];
      var cookieId = cookies[i].split('=')[1];
      cookie[cookieName] = cookieId;
    }
    req.cookies = cookie;
  }
  next();
};

module.exports = parseCookies;