import { useEffect, useState } from "react";

const FightPower = () => {
    const [position, setPosition] = useState<[number, number, number] | null>(null);
    const [heroIndex, setHeroIndex] = useState<EntityIndex>(-1 as EntityIndex); // 改用 useState

    useEffect(() => {
        const checkHeroIndex = () => {
            const localPlayerId = Players.GetLocalPlayer();
            const index = Players.GetPlayerHeroEntityIndex(localPlayerId);

            if (index === -1) {
                $.Schedule(0.1, checkHeroIndex); // 继续轮询
            } else {
                setHeroIndex(index); // 触发重新渲染
            }
        };
        checkHeroIndex();
    }, []);

    useEffect(() => {
        if (heroIndex === -1) return; // 未就绪则跳过

        $.Schedule(Game.GetGameFrameTime(), () => {
            const [x, y, z] = Entities.GetAbsOrigin(heroIndex);
            const screenX = Game.WorldToScreenX(x, y, z);
            const screenY = Game.WorldToScreenY(x, y, z);
            setPosition([screenX, screenY, 0]);
        });
    }, [heroIndex, position]);

    return position ? (
        <Label
            style={{
                position: `${position[0]}px ${position[1]}px ${position[2]}px`,
                color: "white",
                fontSize: "20px",
                backgroundColor: "#FF000080", // 红色半透明背景，便于调试
            }}
            text={`坐标: ${position[0].toFixed(0)}, ${position[1].toFixed(0)}`}
        />
    ) : null;
};

export default FightPower;