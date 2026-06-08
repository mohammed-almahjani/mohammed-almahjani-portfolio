/* projects-data.js
 * ------------------------------------------------------------
 * Exposes PROJECTS_DATA as a global variable so main.js can read
 * it without fetch() — works on both file:// and http:// protocols.
 * Edit this file to update the projects section.
 * ------------------------------------------------------------ */

const PROJECTS_DATA = [
  {
    "id": "Sam-Smart",
    "title": "Sam-Smart Password Manager",
    "category": "Featured Project",
    "subnet": "Security Architecture",
    "description": "A Zero-Knowledge password manager securing credentials locally with AES-256-GCM encryption before sync.",
    "longDescription": "Sam-Smart is a highly secure password management solution designed on zero-knowledge architecture principles. Master passwords are key-derived locally using PBKDF2, ensuring plaintext keys never traverse networks or store in databases. All client vault entries are encrypted client-side using authenticated AES-256-GCM before transport to secure storage surfaces.",
    "techStack": ["Cryptography", "AES-256-GCM", "PBKDF2", "JavaScript ES6", "Firebase", "Web Crypto API"],
    "keyFeatures": [
      "Zero-Knowledge Protocol: Client encryption keys never leave the local device.",
      "AES-256-GCM: Standard authenticated symmetric cryptography for securing credentials.",
      "Cryptographic Derivation: Master keys salted and hashed locally using PBKDF2.",
      "Local Session Vaulting: Secure memory management handles encryption states without disk storage."
    ],
    "links": {
      "github": "https://https://github.com/mohammed-almahjani",
      "demo": "https://example.com"
    },
    "thumbnail": "assets/screenshots/smartsam-thumb.png",
    "architecture": "assets/screenshots/smartsam-arch.png",
    "featured": true
  },
  {
    "id": "grocery-cards",
    "title": "Grocery Cards App",
    "category": "Other Projects",
    "subnet": "Application Development",
    "description": "A clean Flutter utility application providing shopping list management and smart card representation.",
    "longDescription": "An application designed to streamline grocery organization and household card cataloging. Built using Flutter for cross-platform support and clean architecture rules to structure business states.",
    "techStack": ["Flutter", "Dart", "Provider", "Local Cache", "SQLite"],
    "keyFeatures": [
      "State Management: Managed shopping list states smoothly with Provider pattern.",
      "Offline Database: Stored cards and list data locally on device SQL storage.",
      "Clean UI: Designed dark glassmorphic widgets for scanning cards."
    ],
    "links": {
      "github": "https://https://github.com/mohammed-almahjani",
      "demo": ""
    },
    "thumbnail": "assets/screenshots/grocerycards-thumb.png",
    "featured": false
  },
  {
    "id": "multi-area-ospf",
    "title": "Enterprise Multi-Area OSPF Network",
    "category": "Network Labs",
    "subnet": "Core Routing Lab",
    "description": "An enterprise dynamic routing lab configured in EVE-NG linking multi-area OSPF sectors securely.",
    "longDescription": "Designed a multi-site campus topology configuring dynamic OSPF areas. Established Area 0 backbones, configured Area 1 stub sectors, optimized cost-metric path selection, and enabled password-based routing authentication.",
    "techStack": ["OSPF", "Cisco IOS", "EVE-NG", "Routing Authentication", "MD5 Hash"],
    "keyFeatures": [
      "Dynamic Path Optimization: Fine-tuned hello timers and cost metrics for failover stability.",
      "MD5 Authentication: Secured route exchanges against rogue advertisements.",
      "Stub Areas: Restricted LSA floods to optimize memory on branch routers."
    ],
    "links": {
      "github": "https://https://github.com/mohammed-almahjani",
      "demo": ""
    },
    "thumbnail": "assets/screenshots/ospflab-thumb.png",
    "learningOutcomes": [
      "Mastered LSA flooding control and loop avoidance logic.",
      "Understood dynamic convergence metrics under link failure states.",
      "Practiced configuring MD5 authentication protocols on Cisco devices."
    ],
    "featured": false
  },
  {
    "id": "vlan-intervlan-sec",
    "title": "Secure VLAN Segmentation & Inter-VLAN Routing",
    "category": "Network Labs",
    "subnet": "Switching & Security Lab",
    "description": "VLAN network segmentation lab configured in Cisco Packet Tracer to isolate corporate departments.",
    "longDescription": "Configured department segregation using VLANs. Enabled trunk links with dot1q encapsulation, implemented Layer 3 routing via Router-on-a-Stick, secured switches by disabling unused ports, and locked down trunks from VLAN hopping attacks.",
    "techStack": ["VLANs", "802.1Q", "Router-on-a-Stick", "Switchport Security", "Cisco Packet Tracer"],
    "keyFeatures": [
      "Traffic Isolation: Kept department traffic isolated at Layer 2.",
      "Trunk Hardening: Changed native VLANs and disabled DTP negotiation.",
      "Switchport Limits: Restricted MAC addresses per port to prevent MAC-flooding attacks."
    ],
    "links": {
      "github": "https://https://github.com/mohammed-almahjani",
      "demo": ""
    },
    "thumbnail": "assets/screenshots/vlanlab-thumb.png",
    "learningOutcomes": [
      "Configured robust Layer 2 switchport protections.",
      "Built and troubleshot Router-on-a-Stick gateway interfaces.",
      "Mitigated Layer 2 security risks including rogue DHCP insertion."
    ],
    "featured": false
  }
];
