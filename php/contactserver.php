<?php

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["send"])) {

    // Recipient email
    $to = "josephmwamuye5@gmail.com";

    // Collect form data
    $fullname = htmlspecialchars(trim($_POST["fullname"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(trim($_POST["subject"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email address.");
    }

    // Email headers
    $headers = "From: {$fullname} <{$email}>\r\n";
    $headers .= "Reply-To: {$email}\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Email body
    $body = "You have received a new message from your website contact form.\n\n";
    $body .= "Full Name: {$fullname}\n";
    $body .= "Email: {$email}\n";
    $body .= "Subject: {$subject}\n\n";
    $body .= "Message:\n";
    $body .= "{$message}\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        // Redirect back to the contact page
        header("Location: ../contact.php");
        exit();
    } else {
        die("Error: Unable to send email.");
    }

} else {
    // Prevent direct access
    header("Location: ../contact.php");
    exit();
}