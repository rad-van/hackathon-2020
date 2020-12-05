export interface AuditDocument {
  client_ip: string,
  time_stamp: number,
  client_port: number,
  host_ip: string,
  host_port: number,
  unique_id: string,
  request: AuditRequest,
  response: AuditResponse,
  message: AuditMessage,
  allowed: boolean
}

export interface AuditRequest {
  method: string,
  http_version: string,
  uri: string,
  headers: { [key: string]: string }
}

export interface AuditResponse {
  http_code: number,
  headers: { [key: string]: string }
}

export interface AuditMessage {
  message: string,
  details: {
    match: string,
    reference: string,
    ruleId: string,
    file: string,
    lineNumber: string,
    data: string,
    severity: string,
    ver: string,
    rev: string,
    tags: string[],
    maturity: string,
    accuracy: string
  }
}
