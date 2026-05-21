import { createCanvas } from 'canvas'

// --- CONFIG ---
const providerISP = ['TIM SpA', 'Vodafone Italia', 'Wind Tre S.p.A', 'Fastweb S.p.A', 'Iliad Italia', 'Tiscali Italia', 'Eolo S.p.A']
const sistemiOp = ['Windows 11 Pro', 'macOS Sonoma 14.5', 'Ubuntu 24.04 LTS', 'Android 14', 'iOS 17.5', 'ChromeOS 128']
const browserUA = ['Chrome 125.0.6422.60', 'Safari 17.5', 'Firefox 127.0', 'Edge 125.0.2535.51', 'Opera 111.0']
const cittaItaliane = ['Roma', 'Milano', 'Napoli', 'Torino', 'Palermo', 'Genova', 'Firenze', 'Bologna', 'Venezia', 'Catania']
// Mappa città -> coordinate (lat, lon)
const coordCitta = {
  'Roma': [41.9028, 12.4964], 'Milano': [45.4642, 9.1900], 'Napoli': [40.8518, 14.2681],
  'Torino': [45.0703, 7.6869], 'Palermo': [38.1157, 13.3615], 'Genova': [44.4056, 8.9463],
  'Firenze': [43.7696, 11.2558], 'Bologna': [44.4949, 11.3426], 'Venezia': [45.4408, 12.3155],
  'Catania': [37.5079, 15.0900]
}
const porteAperte = ['21 (FTP)', '22 (SSH)', '80 (HTTP)', '443 (HTTPS)', '3306 (MySQL)', '8080 (HTTP-Alt)', '8443 (HTTPS-Alt)']
const vulnerabilita = ['CVE-2024-3094 (XZ Utils)', 'CVE-2023-44487 (HTTP/2 Rapid Reset)', 'CVE-2024-27198 (JetBrains)', 'CVE-2024-6387 (OpenSSH regreSSHion)']

const handler = async (m, { conn, text, usedPrefix, command }) => {
  let target;
  
  // Determina il target: @menzione, numero, o nome testuale
  if (m.mentionedJid && m.mentionedJid[0]) {
    target = { type: 'jid', value: m.mentionedJid[0], name: await conn.getName(m.mentionedJid[0]) || 'Sconosciuto' }
  } else if (m.quoted) {
    target = { type: 'jid', value: m.quoted.sender, name: await conn.getName(m.quoted.sender) || 'Sconosciuto' }
  } else if (text) {
    // Cerca su Google usando cheerio/scraping
    target = { type: 'text', value: text, name: text }
  } else {
    // Default: se stesso
    target = { type: 'jid', value: m.sender, name: await conn.getName(m.sender) || 'Sconosciuto' }
  }

  // Animazione hacking
  let key = await m.reply('━━━━━━━━━━━━━━━━━━━\n*⚡ ELIXIR DOX ENGINE v3.0*\n━━━━━━━━━━━━━━━━━━━\n\n🔍 *INIZIALIZZAZIONE...*');
  await new Promise(resolve => setTimeout(resolve, 800));
  
  await conn.sendMessage(m.chat, { text: '📡 *SCANSIONE OSINT IN CORSO...*', edit: key })
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  await conn.sendMessage(m.chat, { text: '🔗 *RESOLVING IP/DNS...*\n🌐 *BYPassing CDN...*', edit: key })
  await new Promise(resolve => setTimeout(resolve, 1000));

  await conn.sendMessage(m.chat, { text: '🛡️ *ELUDENDO SISTEMI DI SICUREZZA...*', edit: key })
  await new Promise(resolve => setTimeout(resolve, 1000));

  await conn.sendMessage(m.chat, { text: '💾 *ESTRAZIONE DATI COMPLETATA.*', edit: key })
  await new Promise(resolve => setTimeout(resolve, 600));

  // Genera dati fittizi ultra-realistici
  const numero = target.type === 'jid' ? target.value.split('@')[0] : '39' + Math.floor(Math.random() * 1000000000).toString().padStart(10, '0')
  const telefonoFormattato = `+${numero.substring(0, 2)} ${numero.substring(2, 5)} ${numero.substring(5, 8)} ${numero.substring(8)}`
  const nomeCompleto = target.name
  const citta = pickRandom(cittaItaliane)
  const [baseLat, baseLon] = coordCitta[citta] || [41.9, 12.5]
  const lat = (baseLat + (Math.random() - 0.5) * 0.05).toFixed(6)
  const lon = (baseLon + (Math.random() - 0.5) * 0.05).toFixed(6)
  const isp = pickRandom(providerISP)
  const ip = `${randomInt(10, 223)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 254)}`
  const mac = Array(6).fill(0).map(() => randomHex()).join(':').toUpperCase()
  const os = pickRandom(sistemiOp)
  const browser = pickRandom(browserUA)
  const dispositivo = pickRandom(['Samsung Galaxy S24 Ultra', 'iPhone 15 Pro Max', 'Xiaomi 14 Pro', 'Google Pixel 9 Pro', 'OnePlus 12', 'Nothing Phone 3', 'Huawei Mate 60 Pro'])
  const batteria = `${randomInt(7, 98)}%`
  const storage = `${randomInt(20, 95)}% pieno`
  const whVer = `2.24.${randomInt(10, 85)}`
  const email = `${nomeCompleto.toLowerCase().replace(/[^a-z0-9]/g, '.')}@${pickRandom(['gmail.com', 'outlook.it', 'yahoo.com', 'icloud.com', 'live.it'])}`
  const cf = generaCF(nomeCompleto, citta)
  const telefonoInfo = pickRandom(['Contratto TIM Power 200GB', 'Vodafone Unlimited Max 5G', 'Wind Tre Senza Limiti 150GB', 'Iliad 200GB 5G', 'Fastweb Fibra 1Gbps + Mobile 100GB'])
  const porte = pickRandomSet(porteAperte, randomInt(3, 5)).join(', ')
  const vuln = pickRandomSet(vulnerabilita, randomInt(1, 3)).join(', ')
  const punteggioSicurezza = randomInt(23, 89)
  const passProb = pickRandom(['ALTA', 'MEDIA', 'BASSA', 'CRITICA'])
  const dataBreach = Math.random() > 0.5 ? `Sì - ${randomInt(1, 8)} database compromessi` : 'Nessun breach rilevato'
  const socialProfili = `Instagram: @${nomeCompleto.toLowerCase().replace(/[^a-z0-9]/g, '_')}\nFacebook: ${nomeCompleto.replace(/ /g, '.')}\nTikTok: @${nomeCompleto.split(' ')[0].toLowerCase()}_${randomInt(100, 999)}`
  const codFiscale = cf

  // Build report text
  const reportText = `╔══════════════════════════╗
║   ☢️ *ELIXIR DOX REPORT* ☢️
╚══════════════════════════╝

━━━━━━━━━━━━━━━━━━━
*🎯 DATI ANAGRAFICI*
━━━━━━━━━━━━━━━━━━━
• Nome: ${nomeCompleto}
• Telefono: ${telefonoFormattato}
• Email: ${email}
• CF: ${codFiscale}
• IP Pubblico: ${ip}

━━━━━━━━━━━━━━━━━━━
*📱 DISPOSITIVO*
━━━━━━━━━━━━━━━━━━━
• Modello: ${dispositivo}
• OS: ${os}
• Browser: ${browser}
• Batteria: ${batteria}
• Storage: ${storage}
• WhatsApp: ${whVer}
• MAC: ${mac}

━━━━━━━━━━━━━━━━━━━
*🌐 RETE & GEOLOCALIZZAZIONE*
━━━━━━━━━━━━━━━━━━━
• ISP: ${isp}
• IP: ${ip}
• Città: ${citta}
• Coordinate: ${lat}, ${lon}
• Piano Tel.: ${telefonoInfo}

━━━━━━━━━━━━━━━━━━━
*🔓 VULNERABILITÀ*
━━━━━━━━━━━━━━━━━━━
• Porte aperte: ${porte}
• OS Vulnerabilities: ${vuln}
• Punteggio sicurezza: ${punteggioSicurezza}/100 (${passProb})
• Data Breach: ${dataBreach}
• Password compromesse: ${passProb}

━━━━━━━━━━━━━━━━━━━
*📡 SOCIAL PROFILES*
━━━━━━━━━━━━━━━━━━━
${socialProfili}

━━━━━━━━━━━━━━━━━━━
*⚠️ AVVISO LEGALE*
━━━━━━━━━━━━━━━━━━━
Report generato il: ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}
Questo report è generato con dati simulati
per scopi ricreativi. Non utilizzare per attività illegali.

*☢️ REPORT GENERATO DA ELIXIR-BOT*`;

  // Invia testo dox
  await conn.sendMessage(m.chat, { text: reportText, edit: key, mentions: target.type === 'jid' ? [target.value] : [] })
  
  // Genera PDF via Canvas
  try {
    const pdfCanvas = createCanvas(800, 1200)
    const ctx = pdfCanvas.getContext('2d')
    const pdfBuffer = await generaPDFCanvas(ctx, pdfCanvas, { nomeCompleto, telefonoFormattato, email, codFiscale, ip, dispositivo, os, browser, batteria, storage, whVer, mac, isp, citta, lat, lon, telefonoInfo, porte, vuln, punteggioSicurezza, passProb, dataBreach, socialProfili })

    await conn.sendMessage(m.chat, {
      document: pdfBuffer,
      mimetype: 'application/pdf',
      fileName: `Dox_Report_${nomeCompleto.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
      caption: `📄 *Report DOX generato per ${nomeCompleto}*\n📍 Scansiona il PDF per i dettagli completi.`
    }, { quoted: m })
  } catch (e) {
    console.error('[DOX PDF] Errore generazione PDF:', e)
  }
}

handler.help = ['dox']
handler.tags = ['giochi']
handler.command = /^dox/i
handler.group = true

export default handler

// --- FUNZIONI ---
function pickRandom(list) { return list[Math.floor(Math.random() * list.length)] }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
function randomHex() { return Math.floor(Math.random() * 255).toString(16).toUpperCase().padStart(2, '0') }
function pickRandomSet(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function generaCF(nome, citta) {
  const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'
  const vowels = 'AEIOU'
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let cf = ''
  // Prende cognome/nome
  const parts = nome.split(' ')
  const cognome = parts[parts.length - 1] || 'ROSSI'
  const nomePart = parts[0] || 'MARIO'
  // Prime 3 lettere dal cognome
  for (let c of cognome.toUpperCase()) if (consonants.includes(c) && cf.length < 3) cf += c
  for (let c of cognome.toUpperCase()) if (vowels.includes(c) && cf.length < 3) cf += c
  while (cf.length < 3) cf += 'X'
  // Next 3 dal nome
  let nomeCF = ''
  for (let c of nomePart.toUpperCase()) if (consonants.includes(c) && nomeCF.length < 3) nomeCF += c
  for (let c of nomePart.toUpperCase()) if (vowels.includes(c) && nomeCF.length < 3) nomeCF += c
  while (nomeCF.length < 3) nomeCF += 'X'
  cf += nomeCF
  // Anno, mese, giorno
  cf += randomInt(50, 99).toString()
  cf += pickRandom(['A','B','C','D','E','H','L','M','P','R','S','T'])
  cf += randomInt(1, 30).toString().padStart(2, '0')
  // Codice catastale città
  cf += 'H501'
  // Carattere di controllo
  cf += pickRandom(chars)
  return cf
}

async function generaPDFCanvas(ctx, canvas, data) {
  const W = canvas.width, H = canvas.height
  const margin = 40
  
  // Sfondo
  ctx.fillStyle = '#0a0a0f'
  ctx.fillRect(0, 0, W, H)
  
  // Bordo
  ctx.strokeStyle = '#00ff88'
  ctx.lineWidth = 3
  ctx.strokeRect(15, 15, W - 30, H - 30)
  
  // Header
  ctx.fillStyle = '#00ff88'
  ctx.font = 'bold 42px Courier New'
  ctx.textAlign = 'center'
  ctx.fillText('☢️ ELIXIR DOX REPORT ☢️', W/2, 70)
  
  // Sotto-header
  ctx.fillStyle = '#ff4444'
  ctx.font = '16px Courier New'
  ctx.fillText('CLASSIFIED - OCCHI SOLO PER TE', W/2, 95)
  
  // Linea
  ctx.strokeStyle = '#00ff88'
  ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(margin, 110); ctx.lineTo(W - margin, 110); ctx.stroke()
  
  let y = 140
  const lineH = 22
  const col1X = margin + 10
  const col2X = W/2 + 10
  
  const sections = [
    { title: '🎯 DATI ANAGRAFICI', items: [
      `Nome: ${data.nomeCompleto}`,
      `Telefono: ${data.telefonoFormattato}`,
      `Email: ${data.email}`,
      `Codice Fiscale: ${data.codFiscale}`,
      `IP Pubblico: ${data.ip}`
    ]},
    { title: '📱 DISPOSITIVO', items: [
      `Modello: ${data.dispositivo}`,
      `OS: ${data.os}`,
      `Browser: ${data.browser}`,
      `Batteria: ${data.batteria}`,
      `Storage: ${data.storage}`,
      `WhatsApp: ${data.whVer}`,
      `MAC: ${data.mac}`
    ]},
    { title: '🌐 RETE & GEOLOC', items: [
      `ISP: ${data.isp}`,
      `IP: ${data.ip}`,
      `Città: ${data.citta}`,
      `Coordinate: ${data.lat}, ${data.lon}`,
      `Piano Tel.: ${data.telefonoInfo}`
    ]},
    { title: '🔓 VULNERABILITÀ', items: [
      `Porte: ${data.porte}`,
      `Sicurezza: ${data.punteggioSicurezza}/100`,
      `Rischio: ${data.passProb}`,
      `Breach: ${data.dataBreach}`
    ]},
    { title: '📡 SOCIAL', items: data.socialProfili.split('\n') }
  ]

  for (const section of sections) {
    if (y > H - 150) {
      // Pagina nuova (semplificato: non gestiamo multi-pagina con canvas)
      break
    }
    
    ctx.fillStyle = '#ffaa00'
    ctx.font = 'bold 18px Courier New'
    ctx.textAlign = 'left'
    ctx.fillText(section.title, margin, y)
    y += 28
    
    ctx.fillStyle = '#cccccc'
    ctx.font = '14px Courier New'
    for (const item of section.items) {
      ctx.fillText(item, margin + 15, y)
      y += 20
    }
    y += 10
  }
  
  // Footer
  y = H - 80
  ctx.strokeStyle = '#00ff88'
  ctx.beginPath(); ctx.moveTo(margin, y - 10); ctx.lineTo(W - margin, y - 10); ctx.stroke()
  
  ctx.fillStyle = '#666666'
  ctx.font = '11px Courier New'
  ctx.textAlign = 'center'
  ctx.fillText(`Report generato il ${new Date().toLocaleString('it-IT')} | ELIXIR-BOT`, W/2, y + 15)
  ctx.fillText('⚠️ DATI SIMULATI - SOLO PER SCOPI RICREATIVI ⚠️', W/2, y + 35)

  return canvas.toBuffer('image/png')
}
