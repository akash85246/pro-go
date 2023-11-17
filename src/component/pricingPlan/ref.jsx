<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Razorpay Web-Integration</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
</head>

<body>
    <div class="overlay">
        <div class="container payment-container">
            <p>Pay Now</p>
            <p><b> Rs.500/-</b></p>
            <form class="pay-form">
                <div class="form-group">
                    <input type="hidden" name="name" value="">
                </div>
                <div class="form-group">
                    <input type="hidden" name="amount" value="500">
                </div>
                <div class="form-group">
                    <input type="hidden" name="description" value="This transaction was for registration">
                </div>
                <button type="submit" class="btn btn-primary">Pay Now</button>
            </form>

        </div>
    </div>

    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <script>
        $(document).ready(function () {
            console.log("ayush")
            $('.pay-form').submit(function (e) {
                e.preventDefault();
                var formData = $(this).serialize();
                $.ajax({
                    url: "/payment/createOrder",
                    type: "POST",
                    data: formData,
                    success: function (res) {
                        if (res.success) {
                            var options = {
                                "key": "" + res.key_id + "",
                                "amount": "" + res.amount + "",
                                "currency": "INR",
                                "order_id": "" + res.order_id + "",
                                "handler": function (response) {
                                    // alert("Payment Success");
                                    console.log(response);
                                    $.ajax({
                                        url: "/payment/checkPayment",
                                        type: "POST",
                                        data: {
                                            order_id: res.order_id,
                                            payment_id: response.razorpay_payment_id,
                                            signature: response.razorpay_signature || response.signature
                                        },
                                        success: function (checkPaymentResponse) {
                                            // Handle the checkPaymentResponse here
                                            console.log("Check Payment Response:", checkPaymentResponse);

                                            // Optionally, redirect to the dashboard
                                            redirectToDashboard();
                                        },
                                        error: function (error) {
                                            console.error("Error checking payment:", error);
                                            // Handle the error if needed
                                        }
                                    });
                                },
                                "prefill": {
                                    "name": "" + res.name + "",
                                    "email": "" + res.email + ""
                                },
                                "theme": {
                                    "color": "#2300a3"
                                }
                            };
                            var razorpayObject = new Razorpay(options);
                            razorpayObject.on('payment.failed', function (response) {
                                alert("Payment Failed");
                            });
                            razorpayObject.on('payment.success', function (response) {
                                console.log("inside payment success");
                                console.log(response);
                            });
                            razorpayObject.open();
                        } else {
                            alert(res.msg);
                        }
                    }
                });
            });
        });
    </script>
</body>
</html>