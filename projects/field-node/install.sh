#!/usr/bin/env bash
set -euo pipefail
printf '\nAVANYU × ZIAWOLF // FIELD NODE 01\n'
sudo apt update
sudo apt install -y git curl wget jq vim nano python3 python3-pip openssh-client nmap dnsutils traceroute net-tools htop tmux
mkdir -p "$HOME/avanyu-field-node"/{bin,projects,notes,logs}
printf '\nBase field-node tools installed. Heavy workloads belong on authorized remote infrastructure.\n'
