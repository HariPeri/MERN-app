type Props = {
    frontCardImage: string;
    playername: string;
    orientation: string;
};

function CardInfo({ frontCardImage, playername, orientation }: Props) {
    console.log(orientation);
    const isVertical = orientation === 'vertical' || orientation === undefined;
    console.log(isVertical);

    return (
        <div>
            {isVertical ? (
                <div className="rounded-xl h-[18rem] w-48 bg-gradient-to-r from-blue-500 text-white to-blue-700 flex justify-center items-center flex-col ">
                    <div>
                        <img
                            width={160}
                            src={frontCardImage}
                            alt={frontCardImage}
                        />
                    </div>
                    <p className="mt-4">{playername}</p>
                </div>
            ) : (
                <div className="rounded-xl h-[18rem] w-96 bg-gradient-to-r from-blue-500 text-white to-blue-700 flex justify-center items-center flex-col ">
                    <div>
                        <img
                            width="350"
                            src={frontCardImage}
                            alt={frontCardImage}
                        />
                    </div>
                    <p className="mt-4">{playername}</p>
                </div>
            )}
        </div>
    );
}

export default CardInfo;
