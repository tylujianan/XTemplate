import { useState } from 'react';
import { render } from 'react-panorama-x';
import KDA from '../components/KDA';
import FightPower from '../components/FightPower';

function HeroRow({ heroName }: { heroName: string }) {
    return (
        <Panel style={{ flowChildren: 'right' }}>
            <DOTAHeroImage heroimagestyle="icon" heroname={heroName} />
            <Label style={{ marginLeft: '5px' }} localizedText={`#${heroName}`} />
        </Panel>
    );
}


function HeroList() {
    const [text, setText] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    return (
        <Panel className='container'>
            <Panel className='test-block'>
                <HeroRow heroName="npc_dota_hero_antimage" />
                <HeroRow heroName="npc_dota_hero_axe" />
                <HeroRow heroName="npc_dota_hero_beastmaster" />

                <TextEntry style={{ width: '200px' }} text={text} ontextentrychange={(e) => setText(e.text)} />
                <Label text={text} />
                <ToggleButton
                    text="Show details"
                    selected={showDetails}
                    onactivate={() => setShowDetails(!showDetails)}
                />

                {showDetails && <Label text="Details!" />}
            </Panel>
            {/* <KDA /> */}
            <FightPower />
        </Panel>
    );
}


render(<HeroList />, $.GetContextPanel());