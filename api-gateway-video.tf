// API Gateway

// /video
resource "aws_api_gateway_resource" "Video" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  parent_id = "${aws_api_gateway_resource.v1.id}"
  path_part = "video"
}

// /video OPTIONS
resource "aws_api_gateway_method" "Video-OPTIONS" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  resource_id = "${aws_api_gateway_resource.Video.id}"
  http_method = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_method_response" "Video-OPTIONS-200" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  resource_id = "${aws_api_gateway_resource.Video.id}"
  http_method = "${aws_api_gateway_method.Video-OPTIONS.http_method}"
  status_code = "200"
}

resource "aws_api_gateway_integration" "Video-OPTIONS-Integration" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  resource_id = "${aws_api_gateway_resource.Video.id}"
  http_method = "${aws_api_gateway_method.Video-OPTIONS.http_method}"
  type = "MOCK"
}

resource "aws_api_gateway_integration_response" "Video-OPTIONS-Integration-Response" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  resource_id = "${aws_api_gateway_resource.Video.id}"
  http_method = "${aws_api_gateway_method.Video-OPTIONS.http_method}"
  status_code = "${aws_api_gateway_method_response.Video-OPTIONS-200.status_code}"
//  response_parameters = {
//    "method.response.header.Access-Control-Allow-Headers" = ""
//    "method.response.header.Access-Control-Allow-Methods" = "method.response.header.Access-Control-Allow-Methods",
//    "method.response.header.Access-Control-Allow-Origin" = "method.response.header.Access-Control-Allow-Origin"
//  }
}

// /video GET
resource "aws_api_gateway_method" "Video-GET" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  resource_id = "${aws_api_gateway_resource.Video.id}"
  http_method = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "Video-getVideos-integration" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  resource_id = "${aws_api_gateway_resource.Video.id}"
  http_method = "${aws_api_gateway_method.Video-GET.http_method}"
  type = "AWS_PROXY"
  uri = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.aws_region}:${var.aws_account_id}:function:${aws_lambda_function.getVideos.function_name}/invocations"
  integration_http_method = "${aws_api_gateway_method.Video-GET.http_method}"
}

resource "aws_api_gateway_method_response" "Video-GET-200" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  resource_id = "${aws_api_gateway_resource.Video.id}"
  http_method = "${aws_api_gateway_method.Video-GET.http_method}"
  status_code = "200"
}

resource "aws_api_gateway_integration_response" "Video-GET-Integration-Response" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  resource_id = "${aws_api_gateway_resource.Video.id}"
  http_method = "${aws_api_gateway_method.Video-GET.http_method}"
  status_code = "${aws_api_gateway_method_response.Video-GET-200.status_code}"
}

// /video POST
resource "aws_api_gateway_method" "Video-POST" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  resource_id = "${aws_api_gateway_resource.Video.id}"
  http_method = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "Video-createVideo-integration" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  resource_id = "${aws_api_gateway_resource.Video.id}"
  http_method = "${aws_api_gateway_method.Video-POST.http_method}"
  type = "AWS_PROXY"
  uri = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.aws_region}:${var.aws_account_id}:function:${aws_lambda_function.createVideo.function_name}/invocations"
  integration_http_method = "${aws_api_gateway_method.Video-POST.http_method}"
}

resource "aws_api_gateway_method_response" "Video-POST-200" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  resource_id = "${aws_api_gateway_resource.Video.id}"
  http_method = "${aws_api_gateway_method.Video-POST.http_method}"
  status_code = "200"
}

resource "aws_api_gateway_integration_response" "Video-POST-Integration-Response" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  resource_id = "${aws_api_gateway_resource.Video.id}"
  http_method = "${aws_api_gateway_method.Video-POST.http_method}"
  status_code = "${aws_api_gateway_method_response.Video-POST-200.status_code}"
}

// /video POST
resource "aws_api_gateway_method" "Video-PUT" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  resource_id = "${aws_api_gateway_resource.Video.id}"
  http_method = "PUT"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "Video-uploadVideo-integration" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  resource_id = "${aws_api_gateway_resource.Video.id}"
  http_method = "${aws_api_gateway_method.Video-PUT.http_method}"
  type = "AWS_PROXY"
  uri = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.aws_region}:${var.aws_account_id}:function:${aws_lambda_function.uploadVideo.function_name}/invocations"
  integration_http_method = "${aws_api_gateway_method.Video-PUT.http_method}"
}

resource "aws_api_gateway_method_response" "Video-PUT-200" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  resource_id = "${aws_api_gateway_resource.Video.id}"
  http_method = "${aws_api_gateway_method.Video-PUT.http_method}"
  status_code = "200"
}

resource "aws_api_gateway_integration_response" "Video-PUT-Integration-Response" {
  rest_api_id = "${aws_api_gateway_rest_api.DashCamAPI.id}"
  resource_id = "${aws_api_gateway_resource.Video.id}"
  http_method = "${aws_api_gateway_method.Video-PUT.http_method}"
  status_code = "${aws_api_gateway_method_response.Video-PUT-200.status_code}"
}