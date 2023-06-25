import {useState, /*useEffect*/} from 'react'
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form';
  

const CardInput = () => {

    const [title, setTitle] = useState('')
    // const [cards, setCards] = useState<TDeck[]>([])

    const navigate = useNavigate();

    const {
        register,
        trigger,
        formState: { errors },
      } = useForm();
  
    async function handleCreateCard(e: React.FormEvent) {
      e.preventDefault() // This is done so that we don't refresh the page and lose all of our data 

      const isValid = await trigger();

      if(isValid){
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
      navigate('/')
    }
    }
  
    /*useEffect(() => { // Only happens on first render [empty Dependencies array]
  
      async function fetchCards ()  {
        const res = await fetch("http://localhost:3001/cards") 
        const newCards = await res.json()
        setCards(newCards)
      }
  
      fetchCards();
    }, []); */
    
  return (
    <form onSubmit={handleCreateCard}>
        <label className="ml-10"htmlFor='card-title'>  Card Title   </label> {/* htmlFor -> click on label then it selects the input with the specified id*/}
        <input id='card-title'
        className="border-2 border-black rounded-md"
        value={title}
        type="text"
                placeholder="NAME"
                {...register('name', {
                  required: true,
                  maxLength: 100,
                })}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)    
        
      }
      
    }
    
    /> 

        {errors.name && (
                <p className="mt-1 text-primary-500">
                  {errors.name.type === 'required' && 'This field is required.'}
                  {errors.name.type === 'maxLength' &&
                    'Max Length is 100 characters.'}
                </p>
              )}

    
      <button className='ml-10 border-black border-2 p-3 rounded-md hover:bg-gray-300 transition-all duration-500'> Create Card </button>
    
</form>
  )
}

export default CardInput