/* skills-data.js
 * ------------------------------------------------------------
 * Exposes SKILLS_DATA as a global variable so main.js can read
 * it without fetch() — works on both file:// and http:// protocols.
 *
 * Architecture: Domain-grouped skill chip matrix.
 * Each domain contains a flat list of professional skill names
 * rendered as interactive badge/chip clusters (no percentage bars).
 * ------------------------------------------------------------ */

const SKILLS_DATA = [
  {
    "domain": "Network & Infrastructure",
    "icon": "globe",
    "skills": [
      "Cisco Routing & Switching",
      "MikroTik RouterOS",
      "OSPF & Dynamic Routing",
      "VLANs & 802.1Q Trunking",
      "Subnetting & IP Addressing",
      "D-Link Managed Switches",
      "Router-on-a-Stick",
      "PPPoE & Hotspot Systems",
      "Load Balancing",
      "NAT & PAT"
    ]
  },
  {
    "domain": "Defensive Security & Hardening",
    "icon": "shield",
    "skills": [
      "Firewall Rules & Chains",
      "Switchport Security",
      "VLAN Hopping Mitigation",
      "MD5 Routing Authentication",
      "ACL Configuration",
      "Wireshark Packet Analysis",
      "Threat Analysis Fundamentals",
      "Zero-Knowledge Architecture",
      "AES-256-GCM Encryption"
    ]
  },
  {
    "domain": "Systems & Server Administration",
    "icon": "server",
    "skills": [
      "Windows Server (AD, DNS, DHCP)",
      "Linux CLI & SSH",
      "Active Directory Management",
      "Group Policy Configuration",
      "VMware ESXi & Workstation",
      "Service Hardening"
    ]
  },
  {
    "domain": "Cloud & Virtualization",
    "icon": "cloud",
    "skills": [
      "AWS (EC2, VPC)",
      "Firebase (Auth, Firestore)",
      "VMware ESXi",
      "EVE-NG Virtual Labs",
      "GNS3 Emulation"
    ]
  },
  {
    "domain": "Tools & Platforms",
    "icon": "tool",
    "skills": [
      "EVE-NG",
      "GNS3",
      "Cisco Packet Tracer",
      "WinBox",
      "Wireshark",
      "Git & GitHub",
      "VS Code",
      "Microsoft Excel"
    ]
  },
  {
    "domain": "Development & Scripting",
    "icon": "code",
    "skills": [
      "PHP",
      "HTML & CSS",
      "JavaScript",
      "SQL & Database Design",
      "REST APIs",
      "Bash Scripting"
    ]
  }
];
