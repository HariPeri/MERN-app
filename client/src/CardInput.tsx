/* eslint-disable react/jsx-props-no-spreading */
import { useState /* useEffect */ } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import HText from './shared/HText';

function CardInput() {
    const inputStyles =
        'w-1/2 mb-2 rounded-lg bg-blue-400 px-5 py-3 placeholder-white';
    const [title, setTitle] = useState('');
    const [frontcardImage, setFrontCardImage] = useState('');
    const [backcardImage, setBackCardImage] = useState('');
    const [playerName, setPlayerName] = useState('');
    // const [cards, setCards] = useState<TDeck[]>([])

    const navigate = useNavigate();

    const {
        register,
        trigger,
        formState: { errors },
    } = useForm();

    async function handleCreateCard(e: React.FormEvent) {
        e.preventDefault(); // This is done so that we don't refresh the page and lose all of our data

        const isValid = await trigger();

        if (isValid) {
            console.log(title, playerName);
            await fetch('http://localhost:3001/cards', {
                // First arg is url and second arg is some data like what type of request and the body [must be stringified]
                method: 'POST',
                body: JSON.stringify({
                    title,
                    playerName,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setTitle(''); // Clears out the input once it is added to our database
            setPlayerName('');
            navigate('/');
        }
    }

    return (
        <div className="mt-10 w-1/2 mx-auto">
            <div className="text-center mb-8">
                <HText> Add a New Card </HText>
            </div>
            <form className="flex flex-col mb-2" onSubmit={handleCreateCard}>
                <input
                    className={inputStyles}
                    value={playerName}
                    type="text"
                    placeholder="PLAYER NAME"
                    {...register('player', {
                        required: true,
                        maxLength: 100,
                    })}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPlayerName(e.target.value);
                    }}
                />

                {errors.player && (
                    <p className="mt-1 text-primary-500">
                        {errors.player.type === 'required' &&
                            'This field is required.'}
                        {errors.player.type === 'maxLength' &&
                            'Max Length is 100 characters.'}
                    </p>
                )}
                <input
                    className={inputStyles}
                    value={title}
                    type="text"
                    placeholder="CARD TITLE"
                    {...register('card_title', {
                        required: true,
                        maxLength: 100,
                    })}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setTitle(e.target.value);
                    }}
                />

                {errors.card_title && (
                    <p className="mt-1 text-primary-500">
                        {errors.card_title.type === 'required' &&
                            'This field is required.'}
                        {errors.card_title.type === 'maxLength' &&
                            'Max Length is 100 characters.'}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-1/2 mx-auto border-black border-2 p-3 rounded-md hover:bg-gray-300 transition-all duration-500"
                >
                    Create Card
                </button>
            </form>
        </div>
    );
}

export default CardInput;
