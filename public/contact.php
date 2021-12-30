<?php
// Using the ini_set()
ini_set("SMTP", "mail.google.com");
ini_set("sendmail_from", "jonjoh121@gmail.com.com");
ini_set("smtp_port", "25");

// The message
$message = "The mail message was sent with the following mail setting:\r\nSMTP = mail.zend.com\r\nsmtp_port = 25\r\nsendmail_from = YourMail@address.com";

// Send
$headers = "From: jonjoh121@gmail.com";

mail('jonjoh121@gmail.com', 'My Subject', $message, $headers);

echo "Check your email now….<BR>";
?>