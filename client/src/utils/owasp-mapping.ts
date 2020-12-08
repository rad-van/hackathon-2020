export interface RuleInfo {
  display: boolean,
  category: string,
  title: string,
  description: string,
  tagText?: string,
  tagBgColor?: string,
}

export const RULE_ID_MAPPINGS: { [key: string]: RuleInfo } = {
  '10': {
    display: false,
    category: 'REQUEST-10-GEO-IP-DATA',
    title: 'Geo IP Data',
    description: 'Geo IP Data',
    tagText: 'GEO-IP-DATA',
  },
  '901': {
    display: false,
    category: 'REQUEST-901-INITIALIZATION',
    title: 'CRS Initialization',
    description: 'Initializes the Core Rules and performs preparatory actions. It also fixes errors and omissions of variable definitions in the setup file.',
  },
  '905': {
    display: false,
    category: 'REQUEST-905-COMMON-EXCEPTIONS',
    title: 'Common exceptions',
    description: 'Used as an exception mechanism to remove common false positives that may be encountered.',
  },
  '910': {
    display: true,
    category: 'REQUEST-910-IP-REPUTATION',
    title: 'IP Reputation and Geo IP',
    description: 'Uses data from previous requests, ProjectHoneypot\'s block list and Geo IP data to determine the level of risk presented by the user.',
    tagText: 'IP-REPUTATION',
  },
  '911': {
    display: true,
    category: 'REQUEST-911-METHOD-ENFORCEMENT',
    title: 'HTTP Methods',
    description: 'Blocks requests with forbidden HTTP methods PUT and PATCH.',
    tagText: 'HTTP-METHOD',
  },
  '912': {
    display: true,
    category: 'REQUEST-912-DOS-PROTECTION',
    title: 'Denial of Service',
    description: 'Anti-Automation rules to detect Denial of Service attacks.',
    tagText: 'DoS',
  },
  '913': {
    display: true,
    category: 'REQUEST-913-SCANNER-DETECTION',
    title: 'Port and environment scanners',
    description: 'Protection against port and environment scanners like security scanners, scripted HTTP clients, web crawlers and bots.',
    tagText: 'SCANNER',
  },
  '920': {
    display: true,
    category: 'REQUEST-920-PROTOCOL-ENFORCEMENT',
    title: 'HTTP Protocol Violation',
    description: 'Protection against common HTTP protocol violations used in application layer attacks by validating HTTP requests against HTTP RFC.',
    tagText: 'PROTOCOL-INVALID',
  },
  '921': {
    display: true,
    category: 'REQUEST-921-PROTOCOL-ATTACK',
    title: 'HTTP Protocol Attack',
    description: 'Protection against header injection, request smuggling, response splitting and parameter pollution.',
    tagText: 'PROTOCOL-ATTACK',
  },
  '930': {
    display: true,
    category: 'REQUEST-930-APPLICATION-ATTACK-LFI',
    title: 'Local File Inclusion',
    description: 'Protection against directory and path traversal attacks, OS file access and restricted file access.',
    tagText: 'FILE-PATH',
  },
  '931': {
    display: true,
    category: 'REQUEST-931-APPLICATION-ATTACK-RFI',
    title: 'Remote File Inclusion',
    description: 'Protection against common types of remote file inclusion (RFI) attack methods like URL parameter using IP address, common RFI vulnerable parameter name used in URL payload, data ends with question mark(s), off-domain reference/kink.',
    tagText: 'REMOTE-FILE',
  },
  '932': {
    display: true,
    category: 'REQUEST-932-APPLICATION-ATTACK-RCE',
    title: 'Remote Command Execution',
    description: 'Protection against remote code execution attacks for Unix and Windows with Shell and PowerShell commands injection, and protection against Shellshock (CVE-2014-6271).',
    tagText: 'REMOTE-COMMAND',
  },
  '933': {
    display: true,
    category: 'REQUEST-933-APPLICATION-ATTACK-PHP',
    title: 'PHP Injection',
    description: 'Protection against PHP injection attacks like opening/closing tag, script file upload, configuration directive, variables, I/O stream and function name and call.',
    tagText: 'PHP',
  },
  '934': {
    display: true,
    category: 'REQUEST-934-APPLICATION-ATTACK-NODEJS',
    title: 'NodeJs Injection',
    description: 'Protection against NodeJs injection attacks like insecure unserialization and generic RCE signatures.',
    tagText: 'NODEJS',
  },
  '941': {
    display: true,
    category: 'REQUEST-941-APPLICATION-ATTACK-XSS',
    title: 'Cross-Site Scripting',
    description: 'Protection against a wide range of cross-site scripting attacks.',
    tagText: 'XSS',
  },
  '942': {
    display: true,
    category: 'REQUEST-942-APPLICATION-ATTACK-SQLI',
    title: 'SQL Injection',
    description: 'Protection against a wide range of SQL injection attacks.',
    tagText: 'SQL',
  },
  '943': {
    display: true,
    category: 'REQUEST-943-APPLICATION-ATTACK-SESSION-FIXATION',
    title: 'Session Fixation',
    description: 'Protection against session fixation attacks through cookies and parameters.',
    tagText: 'SESSION',
  },
  '944': {
    display: true,
    category: 'REQUEST-944-APPLICATION-ATTACK-JAVA',
    title: 'Java Attack',
    description: 'Protection against common Java attacks like payload execution, remote command execution, common Java classes, functions and keywords and known vulnerabilities in Apache Struts and Java deserialization.',
    tagText: 'JAVA',
  },
  '949': {
    display: false,
    category: 'REQUEST-949-BLOCKING-EVALUATION',
    title: 'Request Blocking Evaluation',
    description: 'Evaluating the action to take on the request based on the calculated anomaly score and IP reputation checks.',
  },
  '950': {
    display: true,
    category: 'RESPONSE-950-DATA-LEAKAGES',
    title: 'Data Leakage',
    description: 'Protection against data leakages in the response like directory listing, CGI source code and application status information.',
    tagText: 'DATA-LEAK',
  },
  '951': {
    display: true,
    category: 'RESPONSE-951-DATA-LEAKAGES-SQL',
    title: 'SQL Leakage',
    description: 'Protection against SQL error message leakages for multiple SQL databases (MySQL, PostgreSQL, MS Access, Oracle, sqlite, and many More).',
    tagText: 'SQL-LEAK',
  },
  '952': {
    display: true,
    category: 'RESPONSE-952-DATA-LEAKAGES-JAVA',
    title: 'Java Leakage',
    description: 'Protection against Java source code and error message leakages.',
    tagText: 'JAVA-LEAK',
  },
  '953': {
    display: true,
    category: 'RESPONSE-953-DATA-LEAKAGES-PHP',
    title: 'PHP Leakage',
    description: 'Protection against PHP source code and error message leakages.',
    tagText: 'PHP-LEAK',
  },
  '954': {
    display: true,
    category: 'RESPONSE-954-DATA-LEAKAGES-IIS',
    title: 'IIS Leakage',
    description: 'Protection against sensitive information leakages for Microsoft IIS server, like server default location and error messages.',
    tagText: 'IIS-LEAK',
  },
  '959': {
    display: false,
    category: 'RESPONSE-959-BLOCKING-EVALUATION',
    title: 'Response Blocking Evaluation',
    description: 'Evaluating the action to take on the response based on the calculated anomaly score.',
  },
  '980': {
    display: false,
    category: 'RESPONSE-980-CORRELATION',
    title: 'Response Post Processing',
    description: 'Post processing after the response has been sent to the client (in the logging phase). Its purpose is to provide inbound + outbound correlation of events to provide a more intelligent designation as to the outcome or result of the transaction.',
  },
};

export function mapRuleId(ruleId: string): RuleInfo {
  const rulesPrefix = Object.keys(RULE_ID_MAPPINGS);
  const prefix = rulesPrefix.find(p => ruleId.startsWith(p));

  if (prefix) {
    return RULE_ID_MAPPINGS[prefix];
  }

  return {
    display: false,
    category: 'UNKNOWN',
    title: 'Unknown',
    description: 'Unknown rule.',
  };
}
