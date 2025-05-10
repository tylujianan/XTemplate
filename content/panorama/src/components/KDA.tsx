import { useState, useEffect } from 'react';

function KDA() {
    const [kills, setKills] = useState(() => Game.GetLocalPlayerInfo().player_kills);
    const [deaths, setDeaths] = useState(() => Game.GetLocalPlayerInfo().player_deaths);
    const [assists, setAssists] = useState(() => Game.GetLocalPlayerInfo().player_assists);

    useEffect(() => {
        const handle = GameEvents.Subscribe('dota_player_kill', () => {
            const playerInfo = Game.GetLocalPlayerInfo();
            setKills(playerInfo.player_kills);
            setDeaths(playerInfo.player_deaths);
            setAssists(playerInfo.player_assists);
        });

        return () => GameEvents.Unsubscribe(handle);
    }, []);

    return <Label style={{ color: 'white' }} text={`KDA: ${kills}/${deaths}/${assists}`} />
}

export default KDA; 