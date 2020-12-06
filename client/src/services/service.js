export const fetchData = (definition, action) => {

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