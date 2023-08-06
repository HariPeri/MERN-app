function PlayerInfo() {
    return (
        <div className="w-72 h-[324px] rounded-3xl overflow-hidden border-2">
            <div className="h-2/3 w-3/4 mx-auto animate-pulse" />
            <div className="text-white h-1/6 text-center text-xl flex items-center justify-center animate-pulse" />
            <div className="h-1/6 flex items-center justify-center text-white text-center rounded-b-3xl animate-pulse" />
        </div>
    );
}

export default PlayerInfo;
