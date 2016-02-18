check-cert-expiry
=================

Check expiration dates for SSL/TLS hosts.

Usage
-----

```
check-cert-expiry -t14 example.com:443 host2.example.com:467 ...
```

Outputs warnings for each certificate that expires in less than 14 days. When `-v` is specified, the output will be verbose (status of each certificate, not only expired ones).


### Cron

Check every monday at 7am and send a mail if there are upcoming expirations

```
0 7 * * 1 check-cert-expiry -t14 example.com:443 host2.example.com:467 | mail -E -s "Certificate Expiration" me@example.com
```


Todo
----

- Support self-signed certificate


License
-------

[MIT](LICENSE)
