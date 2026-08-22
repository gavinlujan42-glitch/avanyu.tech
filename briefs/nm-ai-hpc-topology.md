# NM AI HPC Topology

```text
Users / Agencies / Research / Commercial
                 |
          API + Identity
                 |
        NM AI Control Plane
      policy / tokens / audit
                 |
        Slurm + Kubernetes
                 |
      Quantum-X800 XDR IB
          800 Gb/s class
                 |
       +---------+---------+
       |                   |
 GB300 NVL72 #1      GB300 NVL72 #N
 NVLink/NVSwitch     NVLink/NVSwitch
       |                   |
       +---------+---------+
                 |
             Data Fabric
                 |
      NVMe / Parallel / Object

Separate OOB management + security plane
```

## Topology rules

- Treat each NVLink/NVSwitch scale-up domain as a computational unit.
- Use ConnectX-8 and Quantum-X800-class XDR InfiniBand for scale-out.
- Target rail-optimized non-blocking Clos/fat-tree topology for tightly coupled jobs.
- Keep bulk storage traffic from unnecessarily contending with collective GPU traffic.
- Isolate BMC/OOB, provisioning, telemetry and security management.
- Placement always follows identity, data classification and workload policy.

**At AI/HPC scale, the fabric is part of the computer.**
