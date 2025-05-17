import { useState, useEffect } from 'react'
import PersonForm from './components.jsx/PersonForm'
import Filter from './components.jsx/Filter'
import Persons from './components.jsx/Persons'
import personServices from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    personServices
      .getPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
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
      // alert(`${newName} is already added to phonebook`) Old Functionality
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const targetPerson = persons.find(p => p.name === newName);
        const updatedPerson = {...targetPerson, number: newNumber}
        
        personServices
          .updatePerson(updatedPerson)
          .then(changedPerson => {
            setPersons(persons.map(person => updatedPerson.id === person.id ? changedPerson : person))
          })
      }
    } 
    else {
      personServices
        .createContact(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('');
          setNewNumber('');
      })
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

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}`)) {
      personServices
        .deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id));
      })
    }
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
      <Persons persons={displayedPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App