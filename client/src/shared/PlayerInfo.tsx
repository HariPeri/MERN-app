import { TPlayer } from './TPlayer';

type Props = {
    player: TPlayer;
};

function PlayerInfo({ player }: Props) {
    return (
        <div className="w-72 bg-gradient-to-l from-blue-400 to-blue-900 h-[324px] rounded-3xl overflow-hidden">
            <div className="h-2/3 w-3/4 mx-auto">
                <img src={player.playerImage} alt={player.playerName} />
            </div>
            <div className="text-white  bg-union-gold h-1/6 text-center text-xl flex items-center justify-center">
                {player.playerName}
            </div>
            <div className="h-1/6  bg-union-blue     flex items-center justify-center text-white text-center rounded-b-3xl">
                {`Currently at: ${player.currTeam}`}
            </div>
        </div>
    );
}

export default PlayerInfo;
