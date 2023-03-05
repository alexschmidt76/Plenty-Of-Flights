const fetchSearch = async (searchTerm, path) => {

    const options = {
        method: 'GET',
        headers: {
        }
    }
    const response = await fetch(path+searchTerm+`?apiToken=${process.env.REACT_APP_AIRPORTDB_TOKEN}`, options)
    const resData = await response.json()

    return resData
}

const wrapPromise = (promise) => {
    let status = 'pending'
    let result = ''

    let suspender = promise.then(response => {
        status = 'success'
        result = response
    }, err => {
        status = 'error'
        result = err
    })

    return {

        read() {
            if(status === 'pending') {
                throw suspender
            }
            else if (status === 'error') {
                throw result
            }
            return result
        }
    }
}

export const createResource = (searchTerm, path) => {
    return {
        result: wrapPromise(fetchSearch(searchTerm, path))
    }
}