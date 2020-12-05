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
}