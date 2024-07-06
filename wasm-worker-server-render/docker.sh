#!/bin/bash
docker run -v ./app:/app -p 8080:8080 ghcr.io/vmware-labs/wws:latest
