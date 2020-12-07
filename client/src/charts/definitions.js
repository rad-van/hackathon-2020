export const blockedAllowedDefinition = {
    options: {
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 1,
                }
            }]
        },
        maintainAspectRatio: false
    },
    request: {
        labels: ["Allowed", "Blocked"],
        aggregation: true,
        type: "horizontal-bar",
        query : {
            size: 0,
            aggs: {
                aggName: {
                    terms: {
                        field: "status.keyword"
                    },
                    aggs: {
                        count: {
                            value_count: {
                                field: "status.keyword"
                            }
                        }
                    }
                }
            }
        }
    }

};

export const topRulesDefinition = {
    options: {
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                },
                ticks: {
                    beginAtZero: true,
                    stepSize: 1,
                }
            }],
            yAxes: [{
                ticks: {
                    autoSkip: false,
                    fontFamily: 'Roboto, Areal, sans-serif',
                },
                gridLines: {
                    display: false
                }
            }]
        },
        maintainAspectRatio: false
    },
    request: {
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

}

export const topHostsDefinition = {
    options: {
        legend: {
            position: "left",
        },
        scales: {
            xAxes: [{
                display: false,
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                display: false,
                gridLines: {
                    display: false
                }
            }]
        },
        maintainAspectRatio: false
    },
    request: {
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

}

export const topStatusCodesDefinition = {
    options: {
        legend: {
            position: "left",
        },
        scales: {
            xAxes: [{
                display: false,
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                display: false,
                gridLines: {
                    display: false
                }
            }]
        },
        maintainAspectRatio: false
    },
    request: {
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

}

export const topSeverityDefinition = {
    options: {
        legend: {
            display: false,
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    stepSize: 1,
                    beginAtZero: true,
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                }
            }]
        },
        maintainAspectRatio: false
    },
    request: {
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
}

export const rulesPerMinuteDefinition = {
    options: {
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                },
                type: 'time',
                time: {
                    unit: 'minute'
                },
                distribution: 'series'
            }],
            yAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    stepSize: 1,
                    beginAtZero: true
                }
            }]
        }
    },
    request: {
        aggregation: true,
        type: "time",
        query : {
            size: 0,
            aggs: {
                aggName: {
                    date_histogram: {
                        field: "time_stamp",
                        fixed_interval: "5m",
                        min_doc_count : 1,
                    },
                    aggs: {
                        count: {
                            cardinality: {
                                field: "unique_id.keyword"
                            }
                        }
                    }
                }

            }
        }
    }
}

export const topClientsDefinition = {
    options: {
        legend: {
            position: "left",
        },
        scales: {
            xAxes: [{
                display: false,
                gridLines: {
                    display: false
                }
            }],
            yAxes: [{
                display: false,
                gridLines: {
                    display: false
                }
            }]
        },
        maintainAspectRatio: false
    },
    request: {
        aggregation: true,
        type: "horizontal-bar",
        query : {
            size: 0,
            aggs: {
                aggName: {
                    terms: {
                        field: "client_ip.keyword"
                    },
                    aggs: {
                        count: {
                            value_count: {
                                field: "client_ip.keyword"
                            }
                        }
                    }
                }
            }
        }
    }

}


export const auditLogDefinition = {
    request: {
        aggregation: false,
        query : {

        }
    }

}