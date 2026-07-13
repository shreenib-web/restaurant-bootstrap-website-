<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $formType = strtolower(trim($_POST['form_type'] ?? 'contact'));
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');
    $redirectTo = trim($_POST['redirect_to'] ?? 'index.html');

    if (!preg_match('/^(?:[A-Za-z0-9._-]+\.html?)$/', $redirectTo)) {
        $redirectTo = 'index.html';
    }

    $errors = [];

    if ($name === '') {
        $errors[] = 'Please enter your name.';
    }

    if ($email === '' || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
        $errors[] = 'Please provide a valid email address.';
    }

    if ($message === '') {
        $errors[] = 'Please share a message with us.';
    }

    if ($formType === 'reservation') {
        $phone = trim($_POST['phone'] ?? '');
        $date = trim($_POST['date'] ?? '');
        $time = trim($_POST['time'] ?? '');
        $guests = trim($_POST['guests'] ?? '');

        if ($phone === '') {
            $errors[] = 'Please enter your phone number.';
        }
        if ($date === '') {
            $errors[] = 'Please select a reservation date.';
        }
        if ($time === '') {
            $errors[] = 'Please select a reservation time.';
        }
        if ($guests === '') {
            $errors[] = 'Please select the number of guests.';
        }
    }

    $hasBot = !empty($_POST['company']) || !empty($_POST['website']);
    if ($hasBot) {
        $errors[] = 'Spam submission detected.';
    }

    $status = 'error';
    $statusMessage = 'We could not send your request. Please try again.';

    if (empty($errors)) {
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

        $sent = @mail($to, $subject, $body, $headers);
        $status = 'success';
        $statusMessage = $formType === 'reservation'
            ? 'Thank you for your reservation request. We will contact you soon.'
            : 'Thank you for your message. We will be in touch shortly.';

        if ($sent === false) {
            error_log('mail() failed while processing ' . $formType . ' form submission.');
        }
    } else {
        $status = 'error';
        $statusMessage = implode(' ', $errors);
    }

    $query = http_build_query([
        'status' => $status,
        'message' => $statusMessage,
    ]);

    header('Location: ' . $redirectTo . '?' . $query);
    exit;
}

header('Location: index.html');
exit;
?>
