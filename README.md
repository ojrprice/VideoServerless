# DashCam Video Processor - Serverless Design

Setup S3 state

```
terraform remote config \
    -backend=s3 \
    -backend-config="bucket=dashvid-terraform-state" \
    -backend-config="key=terraform.tfstate" \
    -backend-config="region=eu-west-1"
```

Running

run `terraform apply -parallelism=1` to see it work.
