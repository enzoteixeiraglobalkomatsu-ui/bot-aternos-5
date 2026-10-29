const mineflayer = require('mineflayer')
const express = require('express')

// Servidor web falso para manter o Render acordado na nuvem
const app = express()
const PORT = process.env.PORT || 3000
app.get('/', (req, res) => res.send('Bot do Aternos está ativo!'))
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))

function criarBot() {
    console.log('A tentar conectar ao servidor do Aternos...')
    
    const bot = mineflayer.createBot({
        host: 'Zenith6700-sieJ-cPGa.aternos.me',
        port: 12503,
        username: 'Bot_AFK_Aternos',
        version: '1.26.3' // Versão exata configurada para o servidor
    })

    bot.on('spawn', () => {
        console.log('O bot entrou no servidor com sucesso!')
        
        // Sistema Anti-AFK: Move-se de 3 em 3 minutos para nunca ser expulso
        setInterval(() => {
            console.log('A movimentar para evitar o AFK...')
            bot.look(Math.random() * Math.PI * 2, 0)
            bot.setControlState('forward', true)
            setTimeout(() => {
                bot.setControlState('forward', false)
            }, 2000)
        }, 180000)
    })

    bot.on('end', () => {
        console.log('O bot caiu. A tentar reconectar em 10 segundos...')
        setTimeout(criarBot, 10000)
    })

    bot.on('error', (err) => {
        console.log('Erro no bot:', err.message || err)
    })
}

criarBot()