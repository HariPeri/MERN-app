/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/jsx-props-no-spreading */
import { useState /* useEffect */ } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MdCloudUpload } from 'react-icons/md';
import Navbar from '../shared/Navbar';

import HText from '../shared/HText';

function CardInput() {
    const inputStyles =
        ' mb-2 rounded-lg bg-blue-400 px-5 py-3 placeholder-white text-white';
    const [frontCardImage, setFrontCardImage] = useState<any>('');
    const [backCardImage, setBackCardImage] = useState<any>('');
    const [playerName, setPlayerName] = useState('');
    const [year, setYear] = useState('');
    const [cardSet, setCardSet] = useState('');
    const [cardType, setCardType] = useState('');
    const [color, setColor] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberedOutOf, setCardNumberedOutof] = useState('');

    const navigate = useNavigate();

    function convertToBase64Front(e: React.ChangeEvent<HTMLInputElement>) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files![0]);
        reader.onload = () => {
            // console.log(reader.result);
            setFrontCardImage(reader.result);
        };
        /* reader.onerror = (error) => {
            //console.log('Error: ', error);
        }; */
    }

    function convertToBase64Back(e: React.ChangeEvent<HTMLInputElement>) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files![0]);
        reader.onload = () => {
            // console.log(reader.result);
            setBackCardImage(reader.result);
        };
        /* reader.onerror = (error) => {
            console.log('Error: ', error);
        }; */
    }

    const {
        register,
        trigger,
        formState: { errors },
    } = useForm();

    async function handleCreateCard(e: React.FormEvent) {
        e.preventDefault(); // This is done so that we don't refresh the page and lose all of our data

        const isValid = await trigger();

        if (isValid) {
            const date: Date = new Date();
            const currentDay = String(date.getDate()).padStart(2, '0');
            const currentMonth = String(date.getMonth() + 1).padStart(2, '0');
            const currentYear = date.getFullYear();

            const dateAcquired = `${currentMonth}/${currentDay}/${currentYear}`;

            // (frontCardImage, backCardImage);

            const cardResponse = await fetch('http://localhost:3001/cards', {
                // First arg is url and second arg is some data like what type of request and the body [must be stringified]
                method: 'POST',
                body: JSON.stringify({
                    frontCardImage,
                    backCardImage,
                    year,
                    playerName,
                    cardSet,
                    cardType,
                    color,
                    cardNumber,
                    cardNumberedOutOf,
                    dateAcquired,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const card = await cardResponse.json();
            // eslint-disable-next-line no-underscore-dangle
            const cardID = card._id; // Assuming the response contains the _id of the newly created card

            await fetch('http://localhost:3001/players', {
                // First arg is url and second arg is some data like what type of request and the body [must be stringified]
                method: 'POST',
                body: JSON.stringify({
                    playerName,
                    cardID,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            navigate('/');
        }
    }

    return (
        <div>
            <Navbar />
            <div className="mt-10 w-1/2 mx-auto">
                <div className="text-center mb-8">
                    <HText> Add a New Card </HText>
                </div>
                <form
                    className="md:grid grid-cols-2 gap-4"
                    onSubmit={handleCreateCard}
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <div className="relative h-64 mb-2 rounded-lg bg-blue-400">
                                <input
                                    className="absolute opacity-0 h-full w-full z-[1] cursor-pointer"
                                    type="file"
                                    accept="image/*"
                                    placeholder="cardImage"
                                    {...register('cardImage', {
                                        validate: {
                                            lessthan10mb: (files) =>
                                                files[0]?.size < 30000 ||
                                                'Max 30kb',
                                        },
                                    })}
                                    onChange={convertToBase64Front}
                                />
                                <div className="py-20 flex flex-col justify-center text-center items-center text-white">
                                    {frontCardImage ? (
                                        <p> </p>
                                    ) : (
                                        <p> Browse Files to Upload </p>
                                    )}
                                    {frontCardImage ? (
                                        <img
                                            className="absolute top-4"
                                            width={160}
                                            height={350}
                                            src={frontCardImage}
                                            alt={frontCardImage}
                                        />
                                    ) : (
                                        <MdCloudUpload className="h-16 w-16" />
                                    )}
                                </div>
                            </div>

                            {errors.cardImage && (
                                <p className=" text-primary-500 text-center">
                                    {errors.cardImage.type === 'lessthan10mb' &&
                                        'Please input a front image'}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <div className="relative h-64 mb-2 rounded-lg bg-blue-400">
                                <input
                                    className="absolute opacity-0 h-full w-full z-[1] cursor-pointer"
                                    type="file"
                                    accept="image/*"
                                    placeholder="cardImage2"
                                    {...register('cardImage2', {
                                        validate: {
                                            lessthan10mb: (files) =>
                                                files[0]?.size < 30000 ||
                                                'Max 30kb',
                                        },
                                    })}
                                    onChange={convertToBase64Back}
                                />
                                <div className="py-20 flex flex-col justify-center text-center items-center text-white">
                                    {backCardImage ? (
                                        <p> </p>
                                    ) : (
                                        <p> Browse Files to Upload </p>
                                    )}
                                    {backCardImage ? (
                                        <img
                                            className="absolute top-4"
                                            width={160}
                                            height={350}
                                            src={backCardImage}
                                            alt={backCardImage}
                                        />
                                    ) : (
                                        <MdCloudUpload className="h-16 w-16" />
                                    )}
                                </div>
                            </div>

                            {errors.cardImage2 && (
                                <p className=" text-primary-500 text-center">
                                    {errors.cardImage2.type ===
                                        'lessthan10mb' &&
                                        'Please input a back image!'}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <input
                                className={inputStyles}
                                value={cardNumber}
                                type="text"
                                placeholder="CARD NUMBER"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setCardNumber(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex flex-col">
                            <input
                                className={inputStyles}
                                value={cardNumberedOutOf}
                                type="text"
                                placeholder="CARD NUM OUT OF"
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setCardNumberedOutof(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <input
                            className={inputStyles}
                            value={playerName}
                            type="text"
                            placeholder="PLAYER NAME"
                            {...register('player', {
                                required: true,
                                maxLength: 100,
                            })}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setPlayerName(e.target.value);
                            }}
                        />

                        {errors.player && (
                            <p className=" text-primary-500">
                                {errors.player.type === 'required' &&
                                    'This field is required'}
                                {errors.player.type === 'maxLength' &&
                                    'Max Length is 100 characters.'}
                            </p>
                        )}
                        <input
                            className={inputStyles}
                            value={year}
                            type="text"
                            placeholder="YEAR"
                            {...register('year', {
                                required: true,
                                maxLength: 100,
                            })}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setYear(e.target.value);
                            }}
                        />

                        {errors.year && (
                            <p className=" text-primary-500">
                                {errors.year.type === 'required' &&
                                    'This field is required.'}
                                {errors.year.type === 'maxLength' &&
                                    'Max Length is 100 characters.'}
                            </p>
                        )}

                        <input
                            className={inputStyles}
                            value={cardSet}
                            type="text"
                            placeholder="CARD SET"
                            {...register('cardset', {
                                required: true,
                                maxLength: 100,
                            })}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setCardSet(e.target.value);
                            }}
                        />

                        {errors.cardset && (
                            <p className=" text-primary-500">
                                {errors.cardset.type === 'required' &&
                                    'This field is required.'}
                                {errors.cardset.type === 'maxLength' &&
                                    'Max Length is 100 characters.'}
                            </p>
                        )}

                        <input
                            className={inputStyles}
                            value={cardType}
                            type="text"
                            placeholder="CARD TYPE"
                            {...register('cardtype', {
                                required: true,
                                maxLength: 100,
                            })}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setCardType(e.target.value);
                            }}
                        />

                        {errors.cardtype && (
                            <p className=" text-primary-500">
                                {errors.cardtype.type === 'required' &&
                                    'This field is required.'}
                                {errors.cardtype.type === 'maxLength' &&
                                    'Max Length is 100 characters.'}
                            </p>
                        )}

                        <input
                            className={inputStyles}
                            value={color}
                            type="text"
                            placeholder="COLOR"
                            {...register('cardcolor', {
                                required: true,
                                maxLength: 100,
                            })}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                setColor(e.target.value);
                            }}
                        />

                        {errors.cardcolor && (
                            <p className=" text-primary-500">
                                {errors.cardcolor.type === 'required' &&
                                    'This field is required.'}
                                {errors.cardcolor.type === 'maxLength' &&
                                    'Max Length is 100 characters.'}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-1/2 mx-auto hover:text-white border-black border-2 p-3 rounded-md hover:bg-blue-600 transition-all duration-500"
                    >
                        Create Card
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CardInput;
