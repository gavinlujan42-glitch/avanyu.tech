# NM AI HPC Coordination Fabric

**Architecture control · 22 August 2026**

A sovereign New Mexico AI/HPC coordination layer for discovering, scheduling, governing, metering and brokering authorized compute capacity.

## Reference architecture

- GB300 NVL72-class scale-up compute domains
- NVLink/NVSwitch inside each domain
- ConnectX-8 + Quantum-X800-class XDR InfiniBand for scale-out
- Non-blocking Clos/fat-tree target for tightly coupled AI/HPC workloads
- Separate compute, data and management planes
- Slurm for HPC/batch and Kubernetes for inference/services
- Federated identity, Zero Trust admission, metering and audit

## Compute tokens

Compute tokens are entitlement/accounting units representing measurable resources such as GPU-hours, GPU memory, CPU, storage, network, energy, priority and security requirements. They are not inherently cryptocurrency or speculative assets.

Allocation classes: Mission, Research, Innovation, Commercial, Community and policy-controlled Priority.

A protected **NM Sovereign Compute Reserve** remains available for emergency, cybersecurity, water, wildfire, drought, critical infrastructure and other public missions.

## Brokerage

Approved providers advertise eligible excess capacity. Authorized consumers request capability, duration, security classification and priority. The control plane resolves policy and placement, schedules execution, meters actual consumption, debits the allocation and credits the provider.

## Design philosophy

**Mission before market. Fabric before fleet. Policy before placement. Sovereignty through federation. Measure everything. Human authority governs machine optimization.**

The objective is not merely a supercomputer. It is a statewide coordination layer through which heterogeneous New Mexico AI/HPC resources can operate as an auditable, policy-governed computational commons.
