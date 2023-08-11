function Divider() {
    return (
        <div className="h-16 grid grid-cols-2">
            <div className="ml-[5%] flex justify-self-start w-[93%]">
                <div className="basis-[99%] h-[12.5%] my-auto bg-union-gold" />
                <div className="basis-[1%] h-full bg-union-gold" />
            </div>
            <div className="w-[93%] justify-self-end flex">
                <div className="basis-[1%] h-full bg-union-gold" />
                <div className="basis-[99%] h-[12.5%] my-auto bg-union-gold mr-[5%]" />
            </div>
        </div>
    );
}

export default Divider;
