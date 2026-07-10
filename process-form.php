<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $formType = $_POST['form_type'] ?? '';
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');
    $redirectTo = trim($_POST['redirect_to'] ?? 'index.html');

    $to = 'hello@foodie.com';
    $subject = $formType === 'reservation' ? 'New Reservation Request' : 'New Contact Message';

    $body = "Form Type: $formType\n";
    $body .= "Name: $name\n";
    $body .= "Email: $email\n";

    if ($formType === 'reservation') {
        $body .= "Phone: " . trim($_POST['phone'] ?? '') . "\n";
        $body .= "Date: " . trim($_POST['date'] ?? '') . "\n";
        $body .= "Time: " . trim($_POST['time'] ?? '') . "\n";
        $body .= "Guests: " . trim($_POST['guests'] ?? '') . "\n";
    }

    $body .= "Message: $message\n";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    mail($to, $subject, $body, $headers);
}

header('Location: ' . $redirectTo . '?success=1');
exit;
?>
