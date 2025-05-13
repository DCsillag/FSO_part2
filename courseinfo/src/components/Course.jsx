// Heading Component
const Header = ({course}) => <h1>{course.name}</h1>;

// Content parts, which can be created from a part.
const Part = ({part}) => <p>{part.name} {part.exercises}</p>;

//Content, create dynamically using Map. 
const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

// Create a sum of exercises in the course
const Total = ({parts}) => {
    const total = parts.reduce((sum, order) => {
        return sum+order.exercises
    }, 0);

    return (
        <p>total of {total} exercises</p>
    )
}

const Course = ({course}) => {
    return (
        <>
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </>
    )
}

export default Course