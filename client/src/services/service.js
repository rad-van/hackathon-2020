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

    console.log(requestOptions);
    fetch('http://localhost:8088/history', requestOptions)
        .then((resp) => resp.json().then((body) => {
            console.log(body);
            action(body);
        }));
};