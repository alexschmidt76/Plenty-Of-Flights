const fetchSearch = async (searchTerm, path) => {

    const options = {
        method: 'GET',
        headers: {
        }
    }

    const response = await fetch(path+searchTerm+"?apiToken=f75dd2923cf6c92ed4871307b03707d5e6d77aad3a4d8fd4c7c599962525768b9c7bfdeb9891899cc39958db07284fea", options)
    const resData = await response.json()


    return resData.results
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