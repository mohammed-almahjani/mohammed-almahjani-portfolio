/* skills-data.js
 * ------------------------------------------------------------
 * Exposes SKILLS_DATA as a global variable so main.js can read
 * it without fetch() — works on both file:// and http:// protocols.
 * Edit this file to update the skills section.
 * ------------------------------------------------------------ */

const SKILLS_DATA = [
  {
    "category": "Networking",
    "icon": "globe",
    "skills": [
      { "name": "Cisco Routing & Switching", "level": 75, "label": "Intermediate" },
      { "name": "MikroTik RouterOS", "level": 65, "label": "Intermediate" },
      { "name": "VLANs & Subnetting", "level": 80, "label": "Proficient" },
      { "name": "OSPF & Static Routing", "level": 70, "label": "Intermediate" },
      { "name": "D-Link Switches", "level": 70, "label": "Intermediate" }
    ]
  },
  {
    "category": "Cybersecurity",
    "icon": "shield",
    "skills": [
      { "name": "Security Fundamentals", "level": 75, "label": "Intermediate" },
      { "name": "Firewall Rules", "level": 65, "label": "Intermediate" },
      { "name": "Threat Analysis Basics", "level": 60, "label": "Competent" },
      { "name": "Wireshark Packet Analysis", "level": 70, "label": "Intermediate" }
    ]
  },
  {
    "category": "Systems & Servers",
    "icon": "server",
    "skills": [
      { "name": "Windows Server (AD, DNS, DHCP)", "level": 75, "label": "Intermediate" },
      { "name": "Linux Basics (CLI, SSH)", "level": 65, "label": "Intermediate" }
    ]
  },
  {
    "category": "Virtualization & Cloud",
    "icon": "cloud",
    "skills": [
      { "name": "VMware ESXi & Workstation", "level": 70, "label": "Intermediate" },
      { "name": "AWS (EC2, VPC)", "level": 60, "label": "Competent" },
      { "name": "Firebase Basics", "level": 55, "label": "Beginner" }
    ]
  },
  {
    "category": "Tools & Platforms",
    "icon": "tool",
    "skills": [
      { "name": "EVE-NG & GNS3", "level": 75, "label": "Intermediate" },
      { "name": "Cisco Packet Tracer", "level": 80, "label": "Proficient" },
      { "name": "WinBox Utility", "level": 75, "label": "Intermediate" },
      { "name": "GitHub (Version Control)", "level": 65, "label": "Intermediate" },
      { "name": "Microsoft Excel", "level": 70, "label": "Intermediate" }
    ]
  }
];
