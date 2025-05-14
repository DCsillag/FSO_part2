import { useState, useEffect } from 'react'
import PersonForm from './components.jsx/PersonForm'
import Filter from './components.jsx/Filter'
import Persons from './components.jsx/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const displayedPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } 
    else {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch}/>
      <h2>Add new contact</h2>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={displayedPersons}/>
    </div>
  )
}

export default App