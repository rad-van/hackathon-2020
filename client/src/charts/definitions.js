export const blockedAllowedDefinition = {
    labels: ["Allowed", "Blocked"],
    colors: ["green", "red"],
    aggregation: true,
    type: "bar",
    query : {
        size: 0,
        aggs: {
            Allowed: {
                filter: {
                    term: {
                        allowed: true
                    }
                },
                aggs: {
                    count: {
                        value_count: {
                            field: "allowed"
                        }
                    }
                }
            },
            Blocked: {
                filter: {
                    term: {
                        allowed: false
                    }
                },
                aggs: {
                    count: {
                        value_count: {
                            field: "allowed"
                        }
                    }
                }
            }
        }
    }
};

export const topRulesDefinition = {
    labels: ["Allowed", "Blocked"],
    aggregation: true,
    type: "horizontal-bar",
    query : {
        size: 0,
        aggs: {
            aggName: {
                terms: {
                    field: "message.details.ruleId.keyword"
                },
                aggs: {
                    count: {
                        value_count: {
                            field: "message.details.ruleId.keyword"
                        }
                    }
                }
            }
        }
    }
}

export const topHostsDefinition = {
    aggregation: true,
    type: "doughnut",
    query : {
        size: 0,
        aggs: {
            aggName: {
                terms: {
                    field: "host_ip.keyword"
                },
                aggs: {
                    count: {
                        value_count: {
                            field: "host_ip.keyword"
                        }
                    }
                }
            }
        }
    }
}

export const topStatusCodesDefinition = {
    aggregation: true,
    type: "doughnut",
    query : {
        size: 0,
        aggs: {
            aggName: {
                terms: {
                    field: "response.http_code"
                },
                aggs: {
                    count: {
                        value_count: {
                            field: "response.http_code"
                        }
                    }
                }
            }
        }
    }
}

export const topSeverityDefinition = {
    aggregation: true,
    type: "horizontal-bar",
    query : {
        size: 0,
        aggs: {
            aggName: {
                terms: {
                    field: "message.details.severity.keyword"
                },
                aggs: {
                    count: {
                        value_count: {
                            field: "message.details.severity.keyword"
                        }
                    }
                }
            }
        }
    }
}

export const rulesPerMinuteDefinition = {
    aggregation: true,
    type: "time",
    query : {
        query: {
            bool: {
                must: [
                    {
                        range: {
                            time_stamp: {
                                gte: 1607207440000
                            }
                        }
                    }
                ]
            }
        },
        size: 0,
        aggs: {
            aggName: {
                terms: {
                    field: "time_stamp",
                    order: {
                        _term: "asc"
                    }
                },
                aggs: {
                    count: {
                        value_count: {
                            field: "time_stamp"
                        }
                    }
                }
            }
        }
    }
}