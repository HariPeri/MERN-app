import { useEffect, useState } from 'react'

type TDeck = {
  title: string,
  _id: string,
}

function App() {
  const [title, setTitle] = useState('')
  const [cards, setCards] = useState<TDeck[]>([])

  async function handleCreateCard(e: React.FormEvent) {
    e.preventDefault() // This is done so that we don't refresh the page and lose all of our data 
    await fetch("http://localhost:3001/cards", { // First arg is url and second arg is some data like what type of request and the body [must be stringified]
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setTitle('') // Clears out the input once it is added to our database
  }

  useEffect(() => { // Only happens on first render [empty Dependencies array]

    async function fetchCards ()  {
      const res = await fetch("http://localhost:3001/cards")
      const newCards = await res.json()
      setCards(newCards)
    }

    fetchCards();
  }, []); 

  return (
    <div className="App h-full">
        <ul className="cards py-5 flex gap-8 ml-5">
            {cards.map((card) => (
                <li className="h-24 w-24 bg-blue-300 flex items-center justify-center flex-wrap" key={card._id}> 
                    {card.title} 
                </li>
            ))}
        </ul>
        <form onSubmit={handleCreateCard}>
            <label className="ml-10"htmlFor='card-title'>  Card Title   </label> {/* htmlFor -> click on label then it selects the input with the specified id*/}
            <input id='card-title'
            className="border-2 border-black rounded-md"
            value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(e.target.value)    
              }
            }
            /> 
            <button className='ml-10 border-black border-2 p-3 rounded-md hover:bg-gray-300 transition-all duration-500'> Create Card </button>
        </form>
    </div>
  )
}

export default App
