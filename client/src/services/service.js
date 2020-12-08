export const fetchData = (definition, action, timeRange) => {
    if(timeRange.startTime && timeRange.endTime){
        definition.request.query.query = {
            bool: {
                must: [
                    {
                        range: {
                            time_stamp: {
                                gte: timeRange.startTime,
                                lte: timeRange.endTime
                            }
                        }
                    }
                ]
            }
        }
    }
    else if(timeRange.startTime) {
        definition.request.query.query = {
            bool: {
                must: [
                    {
                        range: {
                            time_stamp: {
                                gte: timeRange.startTime
                            }
                        }
                    }
                ]
            }
        }

    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(definition.request),
    };

    const backend_host = process.env.REACT_APP_BACKEND_HOST || 'localhost';
    console.log(requestOptions);
    fetch(`http://${backend_host}:8088/history`, requestOptions)
        .then((resp) => resp.json().then((body) => {
            console.log(body);
            action(body);
        }));
};


export const fetchRawData = (definition, action, timeRange) => {
    if(timeRange.startTime && timeRange.endTime){
        definition.request.query.query = {
            bool: {
                must: [
                    {
                        range: {
                            time_stamp: {
                                gte: timeRange.startTime,
                                lte: timeRange.endTime
                            }
                        }
                    }
                ]
            }
        }
    }
    else if(timeRange.startTime) {
        definition.request.query.query = {
            bool: {
                must: [
                    {
                        range: {
                            time_stamp: {
                                gte: timeRange.startTime
                            }
                        }
                    }
                ]
            }
        }

    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(definition.request),
    };

    const backend_host = process.env.REACT_APP_BACKEND_HOST || 'localhost';
    console.log(requestOptions);
    fetch(`http://${backend_host}:8088/history`, requestOptions)
        .then((resp) => resp.json().then((body) => {
            console.log(body);
            action(body);
        }));
};
