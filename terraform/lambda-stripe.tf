// Lambda

// Stripe Webhook
resource "aws_lambda_function" "webhook" {
  filename = "Lambda/StripeLambdas/webhook.zip"
  function_name = "webhook"
  role = "${aws_iam_role.IamForStripeWebhookLambda.arn}"
  handler = "webhook.handler"
  runtime = "nodejs4.3"
  timeout = "30"
  memory_size = "256"
  source_code_hash = "${base64sha256(file("Lambda/StripeLambdas/webhook.zip"))}"
  environment {
    variables = {
      stripe_api_key = "${var.stripe_api_key}"
    }
  }
}