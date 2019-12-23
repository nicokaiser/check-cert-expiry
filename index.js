'use strict';

var url = require('url');
var parseArgs = require('minimist');
var checkTls = require('./lib/check-tls');

var argv = parseArgs(process.argv.slice(2), { boolean: 'v' });
var urls = argv._;

if (urls.length < 1) {
  console.error('Usage: check-cert-expiry host1.example.com:443 host2.example.com:993');
  process.exit();
}

var threshold = argv.d || 14;
var verbose = argv.v || false;

urls.forEach(function (entry) {
  var parsed;
  try {
    // eslint-disable-next-line node/no-deprecated-api
    parsed = url.parse('tls://' + entry);
  } catch (e) {
    console.error('Invalid host "' + entry + '", please use host:port');
    return;
  }

  parsed.port = parsed.port || 443;

  checkTls(parsed.hostname, parsed.port, function (err, res) {
    if (err) {
      console.log(`Invalid certificate for ${entry}: ${err.message}`);
      return;
    }
    var days = Math.floor((res.validTo - new Date()) / (3600 * 24 * 1000));
    if (days < 0) {
      console.log('Certificate for ' + entry + ' (' + res.issuer + ') has expired ' + days + ' days ago');
    } else if (verbose || days < threshold) {
      console.log('Certificate for ' + entry + ' (' + res.issuer + ') expires in ' + days + ' days');
    }
  });
});
