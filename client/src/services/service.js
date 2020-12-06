export const fetchData = (definition, action, timeRange) => {

    if(timeRange.startTime && timeRange.endTime){
        definition.query.query = {
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
        console.log(timeRange.startTime);
        definition.query.query = {
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
    console.log(definition)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(definition),
    };

    console.log(requestOptions);
    fetch('http://localhost:8088/history', requestOptions)
        .then((resp) => resp.json().then((body) => {
            console.log(body);
            action(body);
        }));
};