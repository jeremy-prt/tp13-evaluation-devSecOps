#!/bin/sh
DIR="$(dirname "$0")"
trivy image --severity CRITICAL,HIGH --no-progress --scanners vuln --format json localhost:5000/mon-api:1.0.0 2>/dev/null | python3 "$DIR/trivy-resume.py"
