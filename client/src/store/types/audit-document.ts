export interface AuditDocument {
  client_ip: string,
  time_stamp: number,
  client_port: number,
  host_ip: string,
  host_port: number,
  unique_id: string,
  request: AuditRequest,
  response: AuditResponse,
  message?: AuditMessage,
  messages: AuditMessage[],
  status: 'Allowed' | 'Blocked',
}

export interface AuditRequest {
  method: string,
  http_version: string,
  uri: string,
  headers: { [key: string]: string },
  COUNTRY_CODE: string,
  COUNTRY_NAME: string,
  COUNTRY_CONTINENT: string,
  REGION: string,
  CITY: string,
  POSTAL_CODE: string,
  LATITUDE: string,
  LONGITUDE: string,
  DMA_CODE: string,
  AREA_CODE: string,
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
