// @if SSL='true'
option_settings:
  aws:elb:listener:443:
    SSLCertificateId: SSL_CERT_ARN_WEBAPP
    ListenerProtocol: HTTPS
    InstancePort: 80
// @endif
