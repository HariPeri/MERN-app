type Props = {
    frontCardImage: string;
    playername: string;
};

function CardInfo({ frontCardImage, playername }: Props) {
    return (
        <div className="rounded-xl h-[18rem] w-48 bg-gradient-to-r from-blue-500 text-white to-blue-700 flex justify-center items-center flex-col">
            <div>
                <img width={160} src={frontCardImage} alt={frontCardImage} />
            </div>
            <p className="mt-4"> {playername} </p>
        </div>
    );
}

export default CardInfo;
