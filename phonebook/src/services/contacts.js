import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const createContact = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

const updatePerson = (newPerson) => {
    const request = axios.put(`${baseUrl}/${newPerson.id}`, newPerson);
    return request.then(response => response.data);
}

export default { getPersons, createContact, deletePerson, updatePerson}

