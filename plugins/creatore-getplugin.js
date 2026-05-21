// Plug-in creato da elixir
import fs from 'fs'
import path from 'path'

const handler = async (m, { conn, isROwner, usedPrefix, command, text }) => {
  const pluginsDir = path.join(process.cwd(), 'plugins')
  
  // Lista dei plugin esistenti
  const pluginFiles = fs.readdirSync(pluginsDir).filter(f => f.endsWith('.js'))
  const pluginNames = pluginFiles.map(v => v.replace('.js', ''))

  if (!text) {
    return conn.reply(m.chat, `📂 *Lista Plugin Disponibili:*\n\n${pluginNames.map(v => `• ${v}`).join('\n')}\n\n*Uso:* ${usedPrefix + command} nome_plugin`, m)
  }

  const filename = text.trim().replace('.js', '') + '.js'
  const filePath = path.join(pluginsDir, filename)

  if (!fs.existsSync(filePath)) {
    return conn.reply(m.chat, `❌ Plugin "${text}" non trovato.\n\n*Plugin disponibili:*\n${pluginNames.map(v => `• ${v}`).join('\n')}`, m)
  }

  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    
    // Invia prima il documento come file .js
    await conn.sendMessage(m.chat, { 
      document: Buffer.from(content, 'utf-8'), 
      mimetype: 'text/javascript', 
      fileName: filename 
    }, { quoted: m })
    
    // Poi invia il contenuto come testo (se non è troppo lungo)
    if (content.length < 4000) {
      await conn.reply(m.chat, `📄 *Contenuto di ${filename}:*\n\n\`\`\`js\n${content}\n\`\`\``, m)
    } else {
      await conn.reply(m.chat, `📄 *${filename}* è troppo lungo (${content.length} caratteri).\nScarica il file per vedere il contenuto completo.`, m)
    }
  } catch (e) {
    return conn.reply(m.chat, `❌ Errore nella lettura del file: ${e.message}`, m)
  }
};

handler.help = ['getplugin'];
handler.tags = ['creatore'];
handler.command = ['getplugin', 'plugin'];
handler.rowner = true;

export default handler;
