const Persons = ({persons, deletePerson}) => {
    return (
        persons.map(person =>
            <p 
                key={person.name}>{person.name} | {person.number} | 
                <button onClick={() => deletePerson(person)}>Delete</button>
            </p>
        )
    )
}

export default Persons