/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MdCloudUpload } from 'react-icons/md';
import HText from '../shared/HText';
import Navbar from '../shared/Navbar';
import useAuthContext from '../hooks/useAuthContext';

function PlayerInput() {
    const inputStyles =
        ' mb-2 rounded-lg bg-blue-400 px-5 py-3 placeholder-white text-white';
    const [playerImage, setPlayerImage] = useState<any>('');
    const [playerName, setPlayerName] = useState('');
    const [currTeam, setCurrTeam] = useState('');

    const navigate = useNavigate(); // Navigation Hook

    function convertToBase64Image(e: React.ChangeEvent<HTMLInputElement>) {
        const reader = new FileReader();
        if (e.target.files!.length > 0) {
            reader.readAsDataURL(e.target.files![0]);
            reader.onload = () => {
                // console.log(reader.result);
                setPlayerImage(reader.result);
            };
        }
    }
    const {
        state: { user },
    } = useAuthContext();

    const {
        register,
        trigger,
        formState: { errors },
    } = useForm();

    async function handleCreatePlayer(e: React.FormEvent) {
        e.preventDefault(); // This is done so that we don't refresh the page and lose all of our data

        if (!user) {
            return;
        }

        const isValid = await trigger();

        if (isValid) {
            await fetch('http://localhost:3001/players', {
                // First arg is url and second arg is some data like what type of request and the body [must be stringified]
                method: 'POST',
                body: JSON.stringify({
                    playerImage,
                    playerName,
                    currTeam,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            });

            navigate('/add-card');
        }
    }
    return (
        <div>
            <Navbar />
            <div className="mt-10 mx-auto">
                {/* Header DIV */}
                <div className="text-center mb-10">
                    <HText> Add a New Player </HText>
                </div>
                <form
                    onSubmit={handleCreatePlayer}
                    className="flex flex-col justify-center"
                >
                    <div className="flex flex-col justify-center mx-auto">
                        <div className="relative h-96 w-96 mb-2 rounded-lg bg-blue-400 mx-auto">
                            <input
                                className="absolute opacity-0 h-full w-full z-[1] cursor-pointer"
                                type="file"
                                accept="image/*"
                                placeholder="cardImage"
                                {...register('cardImage', {
                                    validate: {
                                        lessthan10mb: (files) =>
                                            files[0]?.size < 100000 ||
                                            'Max 100kb',
                                    },
                                })}
                                onChange={convertToBase64Image}
                            />
                            <div className="py-20 flex flex-col justify-center text-center items-center text-white">
                                {playerImage ? (
                                    <p> </p>
                                ) : (
                                    <p> Browse Files to Upload </p>
                                )}
                                {playerImage ? (
                                    <img
                                        className="absolute top-16"
                                        height={200}
                                        src={playerImage}
                                        alt={playerImage}
                                    />
                                ) : (
                                    <MdCloudUpload className="h-16 w-16" />
                                )}
                            </div>
                        </div>

                        {errors.cardImage && (
                            <p className=" text-primary-500 text-center">
                                {errors.cardImage.type === 'lessthan10mb' &&
                                    'Please input an image!'}
                            </p>
                        )}

                        <div className="flex justify-between gap-4">
                            <input
                                className={inputStyles}
                                id="cardandplayerInput-autofill-input"
                                value={playerName}
                                type="text"
                                placeholder="PLAYER NAME"
                                {...register('name', {
                                    required: true,
                                    maxLength: 100,
                                })}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setPlayerName(e.target.value);
                                }}
                            />

                            {errors.name && (
                                <p className=" text-primary-500">
                                    {errors.name.type === 'required' &&
                                        'This field is required.'}
                                    {errors.name.type === 'maxLength' &&
                                        'Max Length is 100 characters.'}
                                </p>
                            )}

                            <input
                                className={inputStyles}
                                id="cardandplayerInput-autofill-input"
                                value={currTeam}
                                type="text"
                                placeholder="Current Team"
                                {...register('currTeam', {
                                    required: true,
                                    maxLength: 100,
                                })}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                    setCurrTeam(e.target.value);
                                }}
                            />

                            {errors.currTeam && (
                                <p className=" text-primary-500">
                                    {errors.currTeam.type === 'required' &&
                                        'This field is required.'}
                                    {errors.currTeam.type === 'maxLength' &&
                                        'Max Length is 100 characters.'}
                                </p>
                            )}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-64 mx-auto bg-white hover:text-white border-black border-2 p-3 rounded-md hover:bg-blue-600 transition-all duration-500"
                    >
                        Add Player
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PlayerInput;
