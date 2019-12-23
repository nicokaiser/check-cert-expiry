'use strict';

var tls = require('tls');

module.exports = function (host, port, cb) {
  var tlsSocket = tls.connect(port, host, { servername: host }, function (err, res) {
    if (err) return cb(err);

    var cert = tlsSocket.getPeerCertificate();
    var info = {
      issuer: cert.issuer ? cert.issuer.O : null,
      validTo: new Date(cert.valid_to)
    };
    tlsSocket.end();
    cb(null, info);
  });

  tlsSocket.on('error', cb);
};
