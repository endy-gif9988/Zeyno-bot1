// Plug-in creato da elixir
import os from 'os'

let handler = async (m, { conn, usedPrefix }) => {
  try {
    // — Ping reale —
    const start = process.hrtime.bigint()
    await conn.readMessages([m.key])
    const end = process.hrtime.bigint()
    const latency = (Number(end - start) / 1_000_000).toFixed(2)

    // — Uptime —
    const uptimeMs  = process.uptime() * 1000
    const uptimeStr = clockString(uptimeMs)
    const botStartTime = new Date(Date.now() - uptimeMs)
    const activationTime = botStartTime.toLocaleString('it-IT', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })

    // — RAM reale (OS) —
    const totalRam = os.totalmem()
    const freeRam  = os.freemem()
    const usedRam  = totalRam - freeRam
    const ramPct   = ((usedRam / totalRam) * 100).toFixed(1)
    const toMB     = b => (b / 1024 / 1024).toFixed(1)

    // — RAM processo Node —
    const heap = process.memoryUsage()
    const heapUsed  = toMB(heap.heapUsed)
    const heapTotal = toMB(heap.heapTotal)
    const rss       = toMB(heap.rss)

    // — CPU —
    const cpus    = os.cpus()
    const cpuName = cpus[0]?.model?.trim() || 'N/D'
    const cores   = cpus.length
    const [load1, load5, load15] = os.loadavg()
    const cpuLoadPct = ((load1 / cores) * 100).toFixed(1)

    // — OS info —
    const platform = os.platform()
    const arch     = os.arch()
    const nodeVer  = process.version

    // — Utenti e gruppi —
    const totalUsers  = Object.keys(global.db.data.users).length
    const totalChats  = Object.entries(conn.chats).filter(([id, d]) => id && d.isChats)
    const totalGroups = totalChats.filter(([id]) => id.endsWith('@g.us')).length
    const totalDMs    = totalChats.filter(([id]) => !id.endsWith('@g.us')).length

    // Health indicator
    const healthEmoji = latency < 200 && ramPct < 80 && cpuLoadPct < 70 ? '🟢' : latency < 500 && ramPct < 90 ? '🟡' : '🔴'
    const healthText = latency < 200 && ramPct < 80 && cpuLoadPct < 70 ? '💎 OTTIMO' : latency < 500 && ramPct < 90 ? '⚡ BUONO' : '🔥 CRITICO'

    const sep = '▸'

    const message = `╔══════════════════════════╗
║   🔮 *ELIXIRBOT SYSTEM* 🔮
╚══════════════════════════╝

━━━━━━━━━━━━━━━━━━━
⚡ *PERFORMANCE*
━━━━━━━━━━━━━━━━━━━
${sep} Ping       » \`${latency} ms\`
${sep} Uptime     » \`${uptimeStr}\`
${sep} Attivo da  » \`${activationTime}\`
${sep} Stato      » ${healthEmoji} \`${healthText}\`

━━━━━━━━━━━━━━━━━━━
💾 *MEMORIA*
━━━━━━━━━━━━━━━━━━━
${sep} Sistema    » \`${toMB(usedRam)} / ${toMB(totalRam)} MB  (${ramPct}%)\`
${sep} Heap       » \`${heapUsed} / ${heapTotal} MB\`
${sep} RSS        » \`${rss} MB\`

━━━━━━━━━━━━━━━━━━━
🖥️ *SISTEMA*
━━━━━━━━━━━━━━━━━━━
${sep} CPU        » \`${cpuName} (${cores} core)\`
${sep} Carico     » \`${cpuLoadPct}%\` (1m: ${load1.toFixed(2)} | 5m: ${load5.toFixed(2)} | 15m: ${load15.toFixed(2)})
${sep} OS         » \`${platform} / ${arch}\`
${sep} Node       » \`${nodeVer}\`

━━━━━━━━━━━━━━━━━━━
📊 *STATISTICHE*
━━━━━━━━━━━━━━━━━━━
${sep} Utenti     » \`${totalUsers}\`
${sep} Gruppi     » \`${totalGroups}\`
${sep} DM         » \`${totalDMs}\`

━━━━━━━━━━━━━━━━━━━
${healthEmoji} *${healthText}*  •  🟢 Online  •  👑 Elixir`.trim()

    await conn.sendMessage(m.chat, {
      text: message,
      contextInfo: {
        externalAdReply: {
          title: 'ELIXIRBOT • SYSTEM REPORT',
          body: `Ping: ${latency}ms • RAM: ${ramPct}% • CPU: ${cpuLoadPct}% • ${healthText}`,
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: false,
          sourceUrl: ''
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error('[ping] Errore:', e)
    await conn.reply(m.chat, '❌ Errore nel recupero dei dati di sistema.', m)
  }
}

handler.help    = ['ping']
handler.tags    = ['info']
handler.command = /^(ping)$/i
export default handler

function clockString(ms) {
  const h = Math.floor(ms / 3_600_000)
  const m = Math.floor((ms % 3_600_000) / 60_000)
  const s = Math.floor((ms % 60_000) / 1_000)
  return [h, m, s].map(v => String(v).padStart(2, '0')).join(':')
}
