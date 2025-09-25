import { Controller, Get } from '@nestjs/common';
import { OpenaiService } from 'src/openai/openai.service';
import { GenerateExercisesResponse } from 'src/openai/types/openai-responses';
import { EvaluateExerciseAnswerResponse } from 'src/openai/types/response/evaluate-exercise-answer.response';

@Controller('openai')
export class OpenaiController {
    constructor(private openaiService: OpenaiService) {}

    @Get('test')
    async test(): Promise<GenerateExercisesResponse> {
        const parameters = {
            text: `The Walking Dead: A Longform Overview of the General Scenario
The world as we know it ends swiftly.
A mysterious virus infects humanity, turning the dead into cannibalistic reanimated corpses known 
as walkers. They are slow, mindless, and driven by one instinct—devour the living. A bite infects 
you. Death guarantees your resurrection. The disease is global. No country is spared. Within weeks, 
governments collapse, cities fall, and modern civilization vanishes.
Rick Grimes, a sheriff’s deputy in Georgia, is shot in the line of duty and falls into a coma. He 
awakens alone in an abandoned hospital weeks later. Disoriented, weak, and unaware of what’s 
happened, he steps outside into a world consumed by death. The streets are silent, cars abandoned, 
bodies scattered. He’s greeted not by people—but by decay and the stench of death.
Rick sets off to find his wife Lori and son Carl. Along the way, he meets survivors who tell him 
what the world has become. After enduring close calls, including a terrifying venture into a zombie-
infested Atlanta, Rick reunites with his family and his former best friend Shane, who has stepped 
into Rick’s shoes as both protector and, secretly, Lori’s lover.
The trio joins a small camp of survivors on the outskirts of the city. But it’s clear that this isn’t 
sustainable. Supplies run low. Tensions grow. People die. When walkers attack the camp, killing 
several, Rick decides they need to move.
The Farm & the First Cracks
The group stumbles upon Hershel’s farm, a quiet, fenced property seemingly safe. But beneath the 
surface, Hershel is hiding walkers in his barn—believing they're just sick people who can be cured, 
including his own family. This moral divide causes friction. When Shane opens the barn and the 
group guns down the walkers, including Hershel's daughter, it signals the end of peaceful illusions.
Shane grows unstable, jealous, and violent. He believes Rick is too soft to lead. The tension 
between them reaches its peak when Shane tries to kill Rick. In a defining moment, Rick kills Shane 
to protect himself and his family. Carl, only a child, witnesses it all and finishes Shane off after he 
reanimates.
The group leaves the farm after it’s overrun.
The Prison & The Rise of Humanity’s Darkness
They find a prison—a seemingly perfect sanctuary. Strong walls, fences, space to grow food. The 
group clears it of walkers and settles in. For the first time, there's hope. But hope is short-lived.
They encounter The Governor, leader of a fortified community called Woodbury. Charismatic on 
the surface, The Governor is ruthless, using fear and violence to control. A brutal war erupts 
between Rick’s group and Woodbury. Many die. The prison is eventually lost in the chaos. Lori dies 
giving birth to Judith, and Rick begins to hallucinate her voice. Carl becomes hardened.
The group is scattered, traumatized, surviving on the road.
Terminus, Cannibals, and Cold Realities

They regroup slowly. On the way, signs point to Terminus, a supposed sanctuary. But it's a trap—
Terminus is home to cannibals who lure and eat desperate survivors. Rick, now colder and more 
brutal, leads the group in a bloody escape.
Alexandria: The Rebuilding of Society
Eventually, they arrive at Alexandria, a walled-off suburban community that has survived in 
isolation. Its residents are naive, untouched by the worst of the apocalypse. Rick initially clashes 
with their ways, believing they’re soft. But over time, the lines blur—Rick adapts, and Alexandria 
changes.
The story shifts. It's no longer just survival—it's rebuilding. Communities form: Hilltop, Kingdom, 
Oceanside. Alliances are made. A fragile hope emerges.
Then comes Negan.
Negan and the Saviors: Order Through Fear
Negan is a brutal leader of a large, militarized group called the Saviors, enforcing submission 
through violence. He wields a barbed-wire bat, Lucille, and imposes a system where communities 
give him resources or face death.
Rick underestimates him. In a shocking moment, Negan kills Glenn and Abraham in front of the 
group—establishing dominance and breaking Rick emotionally.
For the first time, Rick bows.
But rebellion brews. A long, brutal conflict—The War—erupts between Rick’s alliance and the 
Saviors. Losses are heavy on both sides. Eventually, Rick defeats Negan but chooses to spare his 
life, believing that true peace requires breaking the cycle of vengeance.
Negan is imprisoned.
Time Jump & Civil Growing Pains
Years pass. Alexandria and its allies begin forming the early seeds of a new civilization. 
Agriculture, trade, laws—they begin to recover what was lost. Judith, now a child, carries the 
legacy of her mother and brother. Michonne becomes a leader. Carol and Daryl remain loyal and 
scarred.
But peace is fragile.
A new threat emerges—the Whisperers. They live among walkers, wearing their skins, using herds 
as weapons. Their leader, Alpha, is savage. In a gruesome act, she marks her territory by spiking 
the heads of several major characters. The Whisperer War pushes the survivors to their limit.
Eventually, Alpha is killed. Her second-in-command, Beta, leads a final assault but is defeated.
The Commonwealth: A Taste of the Old World
Years later, the survivors encounter The Commonwealth, a large, class-divided city-state with tens 
of thousands of residents and remnants of the old world: sports, courts, and corruption.

At first, it seems like a return to civilization. But Rick realizes the same systemic injustices still 
thrive there. He attempts to lead reform. For this, he is assassinated—killed not by walkers or 
warlords, but by someone protecting the status quo.
His death sparks revolution. The Commonwealth is changed.
Legacy and What Remains
Rick’s dream survives through those he led. The communities continue. People build lives again. 
But the walker threat never vanishes. And those who survive carry the scars of what it cost them.
In the end, The Walking Dead is not just a story about zombies. It’s a long, painful journey through 
loss, survival, leadership, trauma, community, and rebirth. The dead walk, but the living carry the 
true burden—finding a reason to keep going in a world that keeps falling apart.`,
            type: 'mcq',
            difficulty: 'hard',
            count: 4,
        };
        const response = await this.openaiService.generateExercises(
            parameters.text,
            parameters.type,
            parameters.difficulty,
            parameters.count
        );
        return response;
    }
}
