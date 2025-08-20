// Lista das 36 queens
const queens = [
    "Desiree Criminal Beck", "Miss Black Bumbum de Ouro", "Morgana dos Bois", 
    "Patricia Furacão", "Cloe Hitmoon", "Rajadão", "Samantha Mandison", 
    "Loly Fox", "Jujubee", "Sarinha Van Damme", "Electra Foxx", "Kika Boom", 
    "Pussy Gold", "Popy Popy", "Miss Noodles", "Orégano", "Tiffany Wolf", 
    "Dax", "Bianca Close", "Juice Nox", "Matrix", "Andy Wes", "Sabrina Carters", 
    "Cris Plane", "Lana Sousa", "Kelsie Alencar", "Sofia Fagundes", "Lila Barros", 
    "Stella Del Sol", "Bella Lima", "Bubbles", "Isla Goes", "Jhenessa Saphir", 
    "Little Michelle", "Raz Balenciaga", "Valentina Higgs"
];

// Elementos do DOM
const normalModeBtn = document.getElementById("normalModeBtn");
const bracketModeBtn = document.getElementById("bracketModeBtn");
const normalModeSection = document.getElementById("normalMode");
const bracketModeSection = document.getElementById("bracketMode");

// Mostrar/ocultar modos
normalModeBtn.addEventListener("click", () => {
    normalModeSection.style.display = "block";
    bracketModeSection.style.display = "none";
    startNormalSimulation();
});

bracketModeBtn.addEventListener("click", () => {
    bracketModeSection.style.display = "block";
    normalModeSection.style.display = "none";
});

// ==================== SIMULAÇÃO NORMAL ====================
function startNormalSimulation() {
    const container = document.getElementById("normalGameContainer");
    container.innerHTML = ""; // Limpar conteúdo
    const shuffled = shuffleArray([...queens]);

    shuffled.forEach((queen, index) => {
        const div = document.createElement("div");
        div.textContent = `${index + 1} - ${queen}`;
        container.appendChild(div);
    });
}

// ==================== MODO BRACKET ====================
const startBracketBtn = document.getElementById("startBracketBtn");
startBracketBtn.addEventListener("click", () => {
    const numRounds = parseInt(document.getElementById("numRounds").value);
    startBracket(numRounds);
});

function startBracket(numRounds) {
    const container = document.getElementById("bracketContainer");
    container.innerHTML = ""; // Limpar quadro

    let participants = shuffleArray([...queens]);
    const roundResults = [];

    for (let round = 1; round <= numRounds; round++) {
        const roundDiv = document.createElement("div");
        roundDiv.className = "bracket-round";
        roundDiv.innerHTML = `<h3>Rodada ${round}</h3>`;

        const roundContainer = document.createElement("div");
        roundContainer.style.display = "flex";
        roundContainer.style.flexWrap = "wrap";
        roundContainer.style.gap = "15px";
        roundDiv.appendChild(roundContainer);

        // Dividir em grupos de 6
        for (let i = 0; i < participants.length; i += 6) {
            const group = participants.slice(i, i + 6);
            if (group.length === 0) continue;

            const groupContainer = document.createElement("div");
            groupContainer.style.display = "flex";
            groupContainer.style.flexDirection = "column";
            groupContainer.style.alignItems = "center";
            groupContainer.style.margin = "10px";

            group.forEach(q => {
                const card = document.createElement("div");
                card.className = "bracket-card";
                card.textContent = q;
                groupContainer.appendChild(card);
            });

            // Elimina 2 aleatoriamente
            if (group.length > 2) {
                const eliminated = shuffleArray([...group]).slice(0, 2);
                eliminated.forEach(e => {
                    const card = document.createElement("div");
                    card.className = "bracket-card";
                    card.style.backgroundColor = "#ffb6c1"; // rosa claro para eliminadas
                    card.textContent = `Eliminada: ${e}`;
                    groupContainer.appendChild(card);
                });

                // Atualiza participantes para a próxima rodada
                participants = participants.filter(p => !eliminated.includes(p));
            }

            roundContainer.appendChild(groupContainer);
        }

        container.appendChild(roundDiv);

        // Se sobrar menos de 2 participantes, encerra
        if (participants.length <= 1) break;
    }

    // Mostra vencedor final
    if (participants.length === 1) {
        const winnerDiv = document.createElement("div");
        winnerDiv.className = "bracket-card";
        winnerDiv.style.marginTop = "20px";
        winnerDiv.style.backgroundColor = "#ff69b4";
        winnerDiv.style.color = "white";
        winnerDiv.textContent = `🏆 Vencedora: ${participants[0]} 🏆`;
        container.appendChild(winnerDiv);
    }
}

// ==================== FUNÇÃO AUXILIAR ====================
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
