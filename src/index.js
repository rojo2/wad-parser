import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import crypto from 'crypto'
import hashes from './hashes.json'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const ThingType = {
  [1]: 'PlayerStart1',
  [2]: 'PlayerStart2',
  [3]: 'PlayerStart3',
  [4]: 'PlayerStart4',
  [11]: 'DeathmatchStart',
  [14]: 'TeleportDest',
  [888]: 'MBFHelperDog',
  [1400]: 'Sound sequence thing(0)',
  [1401]: 'Sound sequence thing(1)',
  [1402]: 'Sound sequence thing(2)',
  [1403]: 'Sound sequence thing(3)',
  [1404]: 'Sound sequence thing(4)',
  [1405]: 'Sound sequence thing(5)',
  [1406]: 'Sound sequence thing(6)',
  [1407]: 'Sound sequence thing(7)',
  [1408]: 'Sound sequence thing(8)',
  [1409]: 'Sound sequence thing(9)',
  [1411]: 'Sound sequence thing(arg)',
  [1500]: 'FloorSlope',
  [1501]: 'CeilingSlope',
  [1504]: 'FloorVertexHeight',
  [1505]: 'CeilingVertexHeight',
  [4001]: 'PlayerStart5',
  [4002]: 'PlayerStart6',
  [4003]: 'PlayerStart7',
  [4004]: 'PlayerStart8',
  [5001]: 'PointPusher',
  [5002]: 'PointPuller',
  [5004]: 'FS_Mapspot',
  [5006]: 'SkyCamCompat',
  [5061]: 'InvisibleBridge32',
  [5064]: 'InvisibleBridge16',
  [5065]: 'InvisibleBridge8',
  [9001]: 'MapSpot',
  [9013]: 'MapSpotGravity',
  [9024]: 'PatrolPoint',
  [9025]: 'SecurityCamera',
  [9026]: 'Spark',
  [9027]: 'RedParticleFountain',
  [9028]: 'GreenParticleFountain',
  [9029]: 'BlueParticleFountain',
  [9030]: 'YellowParticleFountain',
  [9031]: 'PurpleParticleFountain',
  [9032]: 'BlackParticleFountain',
  [9033]: 'WhiteParticleFountain',
  [9037]: 'BetaSkull',
  [9038]: 'ColorSetter',
  [9039]: 'FadeSetter',
  [9040]: 'MapMarker',
  [9041]: 'SectorFlagSetter',
  [9043]: 'TeleportDest3',
  [9044]: 'TeleportDest2',
  [9045]: 'WaterZone',
  [9046]: 'SecretTrigger',
  [9047]: 'PatrolSpecial',
  [9048]: 'SoundEnvironment',
  [9070]: 'InterpolationPoint',
  [9071]: 'PathFollower',
  [9072]: 'MovingCamera',
  [9073]: 'AimingCamera',
  [9074]: 'ActorMover',
  [9075]: 'InterpolationSpecial',
  [9076]: 'HateTarget',
  [9077]: 'UpperStackLookOnly',
  [9078]: 'LowerStackLookOnly',
  [9080]: 'SkyViewpoint',
  [9081]: 'SkyPicker',
  [9082]: 'SectorSilencer',
  [9083]: 'SkyCamCompat',
  [9200]: 'Decal',
  [9300]: 'PolyObjectAnchor',
  [9301]: 'PolyObjectStartSpot(harmless)',
  [9302]: 'PolyObjectStartSpot(crushing)',
  [9303]: 'PolyObjectStartSpot(harmful)',
  [9500]: 'FloorLine',
  [9501]: 'CeilingLine',
  [9502]: 'FloorTilt',
  [9503]: 'CeilingTilt',
  [9510]: 'CopyFloorSlope',
  [9511]: 'CopyCeilingSlope',
  [9982]: 'SecActEyesAboveC',
  [9983]: 'SecActEyesBelowC',
  [9988]: 'CustomSprite',
  [9989]: 'SecActHitFakeFloor',
  [9990]: 'InvisibleBridge',
  [9991]: 'CustomBridge',
  [9992]: 'SecActEyesSurface',
  [9993]: 'SecActEyesDive',
  [9994]: 'SecActUseWall',
  [9995]: 'SecActUse',
  [9996]: 'SecActHitCeil',
  [9997]: 'SecActExit',
  [9998]: 'SecActEnter',
  [9999]: 'SecActHitFloor',
  [14001]: 'AmbientSound',
  [14002]: 'AmbientSound',
  [14003]: 'AmbientSound',
  [14004]: 'AmbientSound',
  [14005]: 'AmbientSound',
  [14006]: 'AmbientSound',
  [14007]: 'AmbientSound',
  [14008]: 'AmbientSound',
  [14009]: 'AmbientSound',
  [14010]: 'AmbientSound',
  [14011]: 'AmbientSound',
  [14012]: 'AmbientSound',
  [14013]: 'AmbientSound',
  [14014]: 'AmbientSound',
  [14015]: 'AmbientSound',
  [14016]: 'AmbientSound',
  [14017]: 'AmbientSound',
  [14018]: 'AmbientSound',
  [14019]: 'AmbientSound',
  [14020]: 'AmbientSound',
  [14021]: 'AmbientSound',
  [14022]: 'AmbientSound',
  [14023]: 'AmbientSound',
  [14024]: 'AmbientSound',
  [14025]: 'AmbientSound',
  [14026]: 'AmbientSound',
  [14027]: 'AmbientSound',
  [14028]: 'AmbientSound',
  [14029]: 'AmbientSound',
  [14030]: 'AmbientSound',
  [14031]: 'AmbientSound',
  [14032]: 'AmbientSound',
  [14033]: 'AmbientSound',
  [14034]: 'AmbientSound',
  [14035]: 'AmbientSound',
  [14036]: 'AmbientSound',
  [14037]: 'AmbientSound',
  [14038]: 'AmbientSound',
  [14039]: 'AmbientSound',
  [14040]: 'AmbientSound',
  [14041]: 'AmbientSound',
  [14042]: 'AmbientSound',
  [14043]: 'AmbientSound',
  [14044]: 'AmbientSound',
  [14045]: 'AmbientSound',
  [14046]: 'AmbientSound',
  [14047]: 'AmbientSound',
  [14048]: 'AmbientSound',
  [14049]: 'AmbientSound',
  [14050]: 'AmbientSound',
  [14051]: 'AmbientSound',
  [14052]: 'AmbientSound',
  [14053]: 'AmbientSound',
  [14054]: 'AmbientSound',
  [14055]: 'AmbientSound',
  [14056]: 'AmbientSound',
  [14057]: 'AmbientSound',
  [14058]: 'AmbientSound',
  [14059]: 'AmbientSound',
  [14060]: 'AmbientSound',
  [14061]: 'AmbientSound',
  [14062]: 'AmbientSound',
  [14063]: 'AmbientSound',
  [14064]: 'AmbientSound',
  [14065]: 'AmbientSound',
  [14066]: 'SoundSequence',
  [14067]: 'AmbientSoundNoGravity',
  [14101]: 'MusicChanger',
  [14102]: 'MusicChanger',
  [14103]: 'MusicChanger',
  [14104]: 'MusicChanger',
  [14105]: 'MusicChanger',
  [14106]: 'MusicChanger',
  [14107]: 'MusicChanger',
  [14108]: 'MusicChanger',
  [14109]: 'MusicChanger',
  [14110]: 'MusicChanger',
  [14111]: 'MusicChanger',
  [14112]: 'MusicChanger',
  [14113]: 'MusicChanger',
  [14114]: 'MusicChanger',
  [14115]: 'MusicChanger',
  [14116]: 'MusicChanger',
  [14117]: 'MusicChanger',
  [14118]: 'MusicChanger',
  [14119]: 'MusicChanger',
  [14120]: 'MusicChanger',
  [14121]: 'MusicChanger',
  [14122]: 'MusicChanger',
  [14123]: 'MusicChanger',
  [14124]: 'MusicChanger',
  [14125]: 'MusicChanger',
  [14126]: 'MusicChanger',
  [14127]: 'MusicChanger',
  [14128]: 'MusicChanger',
  [14129]: 'MusicChanger',
  [14130]: 'MusicChanger',
  [14131]: 'MusicChanger',
  [14132]: 'MusicChanger',
  [14133]: 'MusicChanger',
  [14134]: 'MusicChanger',
  [14135]: 'MusicChanger',
  [14136]: 'MusicChanger',
  [14137]: 'MusicChanger',
  [14138]: 'MusicChanger',
  [14139]: 'MusicChanger',
  [14140]: 'MusicChanger',
  [14141]: 'MusicChanger',
  [14142]: 'MusicChanger',
  [14143]: 'MusicChanger',
  [14144]: 'MusicChanger',
  [14145]: 'MusicChanger',
  [14146]: 'MusicChanger',
  [14147]: 'MusicChanger',
  [14148]: 'MusicChanger',
  [14149]: 'MusicChanger',
  [14150]: 'MusicChanger',
  [14151]: 'MusicChanger',
  [14152]: 'MusicChanger',
  [14153]: 'MusicChanger',
  [14154]: 'MusicChanger',
  [14155]: 'MusicChanger',
  [14156]: 'MusicChanger',
  [14157]: 'MusicChanger',
  [14158]: 'MusicChanger',
  [14159]: 'MusicChanger',
  [14160]: 'MusicChanger',
  [14161]: 'MusicChanger',
  [14162]: 'MusicChanger',
  [14163]: 'MusicChanger',
  [14164]: 'MusicChanger',
  [14165]: 'MusicChanger',
  [32000]: 'DoomBuilderCamera',
  [5]: 'BlueCard',
  [6]: 'YellowCard',
  [7]: 'SpiderMastermind',
  [8]: 'Backpack',
  [9]: 'ShotgunGuy',
  [10]: 'GibbedMarine',
  [12]: 'GibbedMarineExtra',
  [13]: 'RedCard',
  [15]: 'DeadMarine',
  [16]: 'Cyberdemon',
  [17]: 'CellPack',
  [18]: 'DeadZombieMan',
  [19]: 'DeadShotgunGuy',
  [20]: 'DeadDoomImp',
  [21]: 'DeadDemon',
  [22]: 'DeadCacodemon',
  [23]: 'DeadLostSoul',
  [24]: 'Gibs',
  [25]: 'DeadStick',
  [26]: 'LiveStick',
  [27]: 'HeadOnAStick',
  [28]: 'HeadsOnAStick',
  [29]: 'HeadCandles',
  [30]: 'TallGreenColumn',
  [31]: 'ShortGreenColumn',
  [32]: 'TallRedColumn',
  [33]: 'ShortRedColumn',
  [34]: 'Candlestick',
  [35]: 'Candelabra',
  [36]: 'HeartColumn',
  [37]: 'SkullColumn',
  [38]: 'RedSkull',
  [39]: 'YellowSkull',
  [40]: 'BlueSkull',
  [41]: 'EvilEye',
  [42]: 'FloatingSkull',
  [43]: 'TorchTree',
  [44]: 'BlueTorch',
  [45]: 'GreenTorch',
  [46]: 'RedTorch',
  [47]: 'Stalagtite',
  [48]: 'TechPillar',
  [49]: 'BloodyTwitch',
  [50]: 'Meat2',
  [51]: 'Meat3',
  [52]: 'Meat4',
  [53]: 'Meat5',
  [54]: 'BigTree',
  [55]: 'ShortBlueTorch',
  [56]: 'ShortGreenTorch',
  [57]: 'ShortRedTorch',
  [58]: 'Spectre',
  [59]: 'NonsolidMeat2',
  [60]: 'NonsolidMeat4',
  [61]: 'NonsolidMeat3',
  [62]: 'NonsolidMeat5',
  [63]: 'NonsolidTwitch',
  [64]: 'Archvile',
  [65]: 'ChaingunGuy',
  [66]: 'Revenant',
  [67]: 'Fatso',
  [68]: 'Arachnotron',
  [69]: 'HellKnight',
  [70]: 'BurningBarrel',
  [71]: 'PainElemental',
  [72]: 'CommanderKeen',
  [73]: 'HangNoGuts',
  [74]: 'HangBNoBrain',
  [75]: 'HangTLookingDown',
  [76]: 'HangTSkull',
  [77]: 'HangTLookingUp',
  [78]: 'HangTNoBrain',
  [79]: 'ColonGibs',
  [80]: 'SmallBloodPool',
  [81]: 'BrainStem',
  [82]: 'SuperShotgun',
  [83]: 'Megasphere',
  [84]: 'WolfensteinSS',
  [85]: 'TechLamp',
  [86]: 'TechLamp2',
  [87]: 'BossTarget',
  [88]: 'BossBrain',
  [89]: 'BossEye',
  [118]: 'ZBridge',
  [2001]: 'Shotgun',
  [2002]: 'Chaingun',
  [2003]: 'RocketLauncher',
  [2004]: 'PlasmaRifle',
  [2005]: 'Chainsaw',
  [2006]: 'BFG9000',
  [2007]: 'Clip',
  [2008]: 'Shell',
  [2010]: 'RocketAmmo',
  [2011]: 'Stimpack',
  [2012]: 'Medikit',
  [2013]: 'Soulsphere',
  [2014]: 'HealthBonus',
  [2015]: 'ArmorBonus',
  [2018]: 'GreenArmor',
  [2019]: 'BlueArmor',
  [2022]: 'InvulnerabilitySphere',
  [2023]: 'Berserk',
  [2024]: 'BlurSphere',
  [2025]: 'RadSuit',
  [2026]: 'Allmap',
  [2028]: 'Column',
  [2035]: 'ExplosiveBarrel',
  [2045]: 'Infrared',
  [2046]: 'RocketBox',
  [2047]: 'Cell',
  [2048]: 'ClipBox',
  [2049]: 'ShellBox',
  [3001]: 'DoomImp',
  [3002]: 'Demon',
  [3003]: 'BaronOfHell',
  [3004]: 'ZombieMan',
  [3005]: 'Cacodemon',
  [3006]: 'LostSoul',
  [5010]: 'Pistol',
  [5050]: 'Stalagmite',
  [9050]: 'StealthArachnotron',
  [9051]: 'StealthArchvile',
  [9054]: 'StealthChaingunGuy',
  [9056]: 'StealthHellKnight',
  [9058]: 'StealthFatso',
  [9059]: 'StealthRevenant',
  [9052]: 'StealthBaron',
  [9053]: 'StealthCacodemon',
  [9055]: 'StealthDemon',
  [9057]: 'StealthDoomImp',
  [9060]: 'StealthShotgunGuy',
  [9061]: 'StealthZombieMan',
  [9100]: 'ScriptedMarine',
  [9101]: 'MarineFist',
  [9102]: 'MarineBerserk',
  [9103]: 'MarineChainsaw',
  [9104]: 'MarinePistol',
  [9105]: 'MarineShotgun',
  [9106]: 'MarineSSG',
  [9107]: 'MarineChaingun',
  [9108]: 'MarineRocket',
  [9109]: 'MarinePlasma',
  [9110]: 'MarineRailgun',
  [9111]: 'MarineBFG',
}

/**
 * Thing flags, these flags modifies the behaviour of
 * DOOM entities, monsters and items.
 * @readonly
 * @enum {number}
 */
const ThingFlag = { // eslint-disable-line
  SKILL_LEVEL_1: 0x01,
  SKILL_LEVEL_2: 0x02,
  SKILL_LEVEL_3: 0x04,
  DEAF: 0x08,
  NOT_SINGLE_PLAYER: 0x10
}

/**
 * Linedef flags
 * @readonly
 * @enum {number}
 */
const LinedefFlag = { // eslint-disable-line
  /** Blocks players and monsters Doom blocking BLOCKF_CREATURES */
  BLOCKING: 0x0001,
  /** Blocks monsters Doom blockmonsters BLOCKF_MONSTERS */
  BLOCKMONSTERS: 0x0002,
  /** Two sided Doom twosided */
  TWOSIDED: 0x0004,
  /** Upper texture is unpegged Doom dontpegtop */
  DONTPEGTOP: 0x0008,
  /** Lower texture is unpegged Doom dontpegbottom */
  DONTPEGBOTTOM: 0x0010,
  /** Secret (shows as one - sided on automap) Doom secret */
  SECRET: 0x0020,
  /** Blocks sound Doom blocksound BLOCKF_SOUND */
  SOUNDBLOCK: 0x0040,
  /** never shows on automap Doom dontdraw */
  DONTDRAW: 0x0080,
  /** always shows on automap Doom mapped */
  MAPPED: 0x0100,
}
/**
 * Returns if an entry from the entries dictionary matches
 * a string or a specific regexp pattern.
 *
 * @param {string} name
 * @param {string|RegExp} lumpName
 * @returns {boolean}
 */
function isEntry(name, lumpName) {
  if (lumpName instanceof RegExp) {
    return lumpName.test(name)
  }
  return name.substr(0, lumpName.length) === lumpName
}

/**
 * Represents a DOOM entity. It can be an item, a key, a monster
 * or a special entity used for things like player spawning, etc.
 * @typedef {Object} Thing
 * @property {number} x
 * @property {number} y
 * @property {number} angle
 * @property {number} type
 * @property {number} flags
 */

/**
 * Reads a things lump and returns a list of DOOM "Things".
 *
 * @param {Buffer} buffer
 * @param {number} start
 * @param {number} size
 * @returns {Array<Thing>}
 */
function readThings(buffer, start, size) {
  let offset = start
  const things = []
  while (offset < start + size) {
    things.push({
      x: buffer.readInt16LE(offset),
      y: buffer.readInt16LE(offset + 2),
      angle: buffer.readUInt16LE(offset + 4),
      type: buffer.readUInt16LE(offset + 6),
      flags: buffer.readUInt16LE(offset + 8)
    })
    offset += 10
  }
  return things
}

/**
 * A Linedef represents a "wall"
 * @typedef {Object} Linedef
 * @property {number} start - Start vertex index
 * @property {number} end - End vertex index
 * @property {number} flags - Flags
 * @property {number} type - Type
 * @property {number} tag -
 * @property {number} right - Right sidedef index
 * @property {number} left - Left sidedef index
 */

/**
 * Reads a LINEDEFS lump and returns a list of linedefs
 *
 * @param {Buffer} buffer
 * @param {number} start
 * @param {number} size
 * @returns {Array<Linedef>}
 */
function readLinedefs(buffer, start, size) {
  let offset = start
  const linedefs = []
  while (offset < start + size) {
    linedefs.push({
      start: buffer.readUInt16LE(offset),
      end: buffer.readUInt16LE(offset + 2),
      flags: buffer.readUInt16LE(offset + 4),
      type: buffer.readUInt16LE(offset + 6),
      tag: buffer.readUInt16LE(offset + 8),
      right: buffer.readUInt16LE(offset + 10),
      left: buffer.readUInt16LE(offset + 12)
    })
    offset += 14
  }
  return linedefs
}

/**
 * A Sidedef represents a side of a wall, a wall can have two
 * different sides.
 *
 * @typedef {Object} Sidedef
 * @property {number} x -
 * @property {number} y -
 * @property {number} upper - Upper texture index
 * @property {number} middle - Middle texture index
 * @property {number} lower - Lower texture index
 * @property {number} sector - Facing sector
 */

/**
 * Reads a SIDEDEFS lump and returns a list of sidedefs
 *
 * @param {Buffer} buffer
 * @param {number} start
 * @param {number} size
 * @returns {Array<Sidedef>}
 */
function readSidedefs(buffer, start, size) {
  let offset = start
  const sidedefs = []
  while (offset < start + size) {
    sidedefs.push({
      x: buffer.readInt16LE(offset),
      y: buffer.readInt16LE(offset + 2),
      upper: buffer.slice(offset + 4, offset + 12),
      lower: buffer.slice(offset + 12, offset + 20),
      middle: buffer.slice(offset + 20, offset + 28),
      sector: buffer.readUInt16LE(offset + 28)
    })
    offset += 30
  }
  return sidedefs
}

/**
 * Vertex
 * @typedef {Object} Vertex
 * @property {number} x - X coordinate for the vertex
 * @property {number} y - Y coordinate for the vertex
 */

/**
 * Reads a VERTEXES (sic) lump and returns a list of vertices
 *
 * @param {Buffer} buffer
 * @param {number} start
 * @param {number} size
 * @returns {Array<Vertex>}
 */
function readVertexes(buffer, start, size) {
  let offset = start
  const vertexes = []
  while (offset < start + size) {
    vertexes.push({
      x: buffer.readInt16LE(offset),
      y: buffer.readInt16LE(offset + 2)
    })
    offset += 4
  }
  return vertexes
}

/**
 * A segment defines a "wall" of a map.
 * @typedef {Object} Segment
 * @property {number} start - Start vertex index
 * @property {number} end - End vertex index
 * @property {number} angle - Angle
 * @property {number} linedef - Linedef index related to this segment
 * @property {number} direction - Direction of this segment
 * @property {number} offset - Offset of this segment
 */

/**
 * Reads a SEGMENTS lump and returns a list of segments
 *
 * @param {Buffer} buffer
 * @param {number} start
 * @param {number} size
 * @returns {Array<Segment>}
 */
function readSegments(buffer, start, size) {
  let offset = start
  const segs = []
  while (offset < start + size) {
    segs.push({
      start: buffer.readUInt16LE(offset),
      end: buffer.readUInt16LE(offset + 2),
      angle: buffer.readInt16LE(offset + 4),
      linedef: buffer.readUInt16LE(offset + 6),
      direction: buffer.readInt16LE(offset + 8),
      offset: buffer.readInt16LE(offset + 10)
    })
    offset += 12
  }
  return segs
}

/**
 * A subsector represents a smaller sector when a sector
 * is divided by BSP hyperplanes.
 * @typedef {Object} Subsector
 * @property {number} count
 * @property {number} first
 */

/**
 * Reads a SUBSECTOR lump and returns a list of subsectors
 *
 * @param {Buffer} buffer
 * @param {number} start
 * @param {number} size
 * @returns {Array<Subsector>}
 */
function readSubsectors(buffer, start, size) {
  let offset = start
  const subsectors = []
  while (offset < start + size) {
    subsectors.push({
      count: buffer.readInt16LE(offset),
      first: buffer.readInt16LE(offset + 2)
    })
    offset += 4
  }
  return subsectors
}

/**
 * Reads a SECTORS lump and returns a list of Sectors.
 *
 * @param {Buffer} buffer
 * @param {number} start
 * @param {number} size
 * @returns {Array<Sector>}
 */
function readSectors(buffer, start, size) {
  let offset = start
  const sectors = []
  while (offset < start + size) {
    sectors.push({
      floor: {
        height: buffer.readInt16LE(offset),
        texture: buffer.slice(offset + 4, offset + 12)
      },
      ceiling: {
        height: buffer.readInt16LE(offset + 2),
        texture: buffer.slice(offset + 12, offset + 20)
      },
      light: buffer.readInt16LE(offset + 20),
      special: buffer.readUInt16LE(offset + 22),
      tag: buffer.readUInt16LE(offset + 24)
    })
    offset += 26
  }
  return sectors
}

/**
 * A palette is a buffer of 768 values. 256 colors by 3 channels
 * @typedef {Buffer} Palette
 */

/**
 * Reads a PLAYPAL lump and returns a list of palettes. In
 * DOOM the first palette is defined as the "default" palette
 * and the other palettes are used for special effects like
 * when you use a Megasphere, the Radiation Shielding Suit
 * or the Berserk item.
 *
 * @param {Buffer} buffer
 * @param {number} start
 * @param {number} size
 * @returns {Array<Palette>}
 */
function readPalettes(buffer, start, size) {
  let offset = start
  const palettes = []
  while (offset < start + size) {
    palettes.push(buffer.slice(offset, offset + 768))
    offset += 768
  }
  return palettes
}

/**
 * A Flat is a 64x64 pixels bitmap of indexed colors.
 * @typedef {Buffer} Flat
 */

/**
 * Reads a Flat lump and returns the bitmap data.
 *
 * @param {Buffer} buffer
 * @param {number} start
 * @param {number} size
 * @returns {Flat}
 */
function readFlat(buffer, start, size) {
  return buffer.slice(start, start + size)
}

/**
 * Reads a PNAMES lump and returns a list of Patch Names.
 *
 * @param {Buffer} buffer
 * @param {number} start
 * @returns {Array<string>}
 */
function readPatchNames(buffer, start) {
  const count = buffer.readUInt32LE(start)
  const patchNames = []
  for (let index = 0; index < count; index++) {
    const beginning = start + 4 + (index * 8)
    const end = start + 4 + (index * 8) + 8
    patchNames.push(buffer.slice(beginning, end).toString('ascii').replace(/\u0000*$/, ''))  // eslint-disable-line
  }
  return patchNames
}

/**
 * Returns if the specified entry is a Patch
 *
 * @param {Buffer} buffer
 * @param {number} start
 * @returns {boolean}
 */
function isPatch(buffer, start) { // eslint-disable-line
  const width = buffer.readUInt16LE(start)
  const height = buffer.readUInt16LE(start + 2)
  const offsetX = buffer.readInt16LE(start + 4)
  const offsetY = buffer.readInt16LE(start + 6)
  return width > 0 && width <= 4096
      && height > 0 && height <= 4096
      && offsetX >= -320 && offsetX <= 320
      && offsetY >= -200 && offsetY <= 200
}

/**
 * A Patch is the way DOOM saves bitmap data for textures,
 * images and sprites.
 * @typedef {Object} Patch
 * @property {number} width - Patch's width
 * @property {number} height - Patch's height
 * @property {number} offsetX - Pivot point in X
 * @property {number} offsetY - Pivot point in Y
 * @property {Buffer} bitmap - Indexed list of colors
 */

/**
 * Reads a Patch lump and returns the bitmap uncompressed data.
 *
 * @param {Buffer} buffer
 * @param {number} start
 * @returns {Patch}
 */
function readPatch(buffer, start) {
  const width = buffer.readUInt16LE(start)
  const height = buffer.readUInt16LE(start + 2)
  const offsetX = buffer.readInt16LE(start + 4)
  const offsetY = buffer.readInt16LE(start + 6)

  const bitmap = Buffer.alloc(width * height)

  const columns = []
  for (let x = 0; x < width; x++) {
    columns.push(buffer.readUInt32LE(start + 8 + (x * 4)))
  }

  let offset
  for (let x = 0; x < width; x++) {
    offset = start + columns[x]
    let postY = 0
    do {
      postY = buffer.readUInt8(offset)
      offset++

      if (postY === 255) {
        break
      }

      const postHeight = buffer.readUInt8(offset)
      offset++
      //console.log(postY, postHeight, width, height)

      offset++ // dummy byte
      for (let y = 0; y < postHeight; y++) {
        //if (postY + y >= height)
        //  break

        const offsetXY = ((postY + y) * width) + x
        //console.log(offsetXY, offsetX, offsetY, x, y, postY, offsetXY >= bitmap.byteLength)

        const color = buffer.readUInt8(offset)
        offset++

        bitmap.writeUInt8(color, offsetXY)
      }
      offset++ // dummy byte
    }
    while (true); // eslint-disable-line
  }

  return {
    width,
    height,
    offsetX,
    offsetY,
    bitmap
  }
}

/**
 * Returns if the specified entry is a sound or not.
 *
 * @see https: //github.com/coelckers/wadext/blob/1.0/fileformat.cpp
 * @param {Buffer} buffer
 * @param {number} start
 * @param {number} size
 * @returns {boolean}
 */
function isSound(buffer, start, size) {
  if (size < 8) {
    return false
  }
  const sampleRate = buffer.readUInt16LE(start + 2)
  const sampleCount = buffer.readUInt32LE(start + 4)
  return buffer.readUInt8(start) === 3
      && buffer.readUInt8(start + 1) === 0
      && sampleCount <= size - 8
      && sampleRate <= 44100
}

/**
 * A DOOM Sound
 * @typedef {Object} Sound
 * @property {number} format - This is always 3
 * @property {number} sampleRate - It is 11025 (there are some sounds recorded as 22100 Hz sounds)
 * @property {number} sampleCount - Number of samples
 * @property {Buffer} samples - Samples
 */

/**
 * Reads and returns a Sound lump
 *
 * @param {Buffer} buffer
 * @param {number} start
 * @param {number} size
 * @returns {Sound}
 */
function readSound(buffer, start, size) {
  // Tenemos 16 pad bytes y después el contenido
  const format = buffer.readUInt16LE(start)
  const sampleRate = buffer.readUInt16LE(start + 2)
  const sampleCount = buffer.readUInt32LE(start + 4) - 32
  const beginning = start + 24
  const end = start + 24 + sampleCount
  if (end > start + size) {
    throw new Error('Invalid sound end')
  }
  const samples = buffer.slice(beginning, end)
  return {
    format,
    sampleRate,
    sampleCount,
    samples
  }
}

/**
 * A directory entry inside a WAD
 * @typedef {Object} Entry
 * @property {number} start - Entry start
 * @property {number} size - Entry size
 * @property {string} name - Entry name
 */

/**
 * Reads a lump entry and returns a list of entries
 *
 * @param {Buffer} buffer
 * @param {number} start
 * @param {number} count
 * @returns {Array<Entry>}
 */
function readDirectory(buffer, start, count) {
  const lumps = []
  for (let index = 0; index < count; index++) {
    const offset = start + (index * 16)
    lumps.push({
      start: buffer.readUInt32LE(offset),
      size: buffer.readUInt32LE(offset + 4),
      name: buffer.slice(offset + 8, offset + 16).toString('ascii').replace(/\u0000*$/, '') // eslint-disable-line
    })
  }
  return lumps
}

/**
 * Reads the content of a DOOM WAD file (IWAD or PWAD).
 *
 * @param {string} filePath
 * @returns {Promise<Array<Entry>|Error>}
 */
function readWAD(filePath) {

  return readFile(filePath)
    .then((buffer) => {
      const md5 = crypto.createHash('md5')
      const hash = md5.update(buffer).digest('hex')
      const fileName = path.basename(filePath).toLowerCase()
      if (!hashes[fileName][hash]) {
        throw new Error('Invalid WAD hash')
      }
      const version = hashes[fileName][hash]

      const type = buffer.slice(0,4).toString('ascii')
      if (type !== 'PWAD' && type !== 'IWAD') {
        throw new Error('Invalid WAD type')
      }
      const count = buffer.readUInt32LE(4)
      const start = buffer.readUInt32LE(8)
      const entries = readDirectory(buffer, start, count)

      let flats = false
      let patches = false
      let map = null

      const lumps = entries.map(({ name, start, size }) => {
        if (isEntry(name, 'PLAYPAL')) {
          map = null
          return { type: 'palettes', name, start, size, payload: readPalettes(buffer, start, size) }
        } else if (isEntry(name, 'COLORMAP')) {
          map = null
          return { type: 'colormap', name, start, size }
        } else if (isEntry(name, 'TEXTURE1') || isEntry(name, 'TEXTURE2')) {
          map = null
          return { type: 'texture', name, start, size }
        } else if (isEntry(name, 'PNAMES')) {
          map = null
          return { type: 'patchNames', name, start, size, payload: readPatchNames(buffer, start, size) }
        } else if (isEntry(name, /^ST/)) {
          map = null
          return { type: 'statusbar', name, start, size }
        } else if (isEntry(name, /^DS/) && isSound(buffer, start, size)) {
          map = null
          return { type: 'sound', name, start, size, payload: readSound(buffer, start, size) }
        } else if (isEntry(name, 'THINGS')) {
          return { type: 'things', map, name, start, size, payload: readThings(buffer, start, size) }
        } else if (isEntry(name, 'LINEDEFS')) {
          return { type: 'linedefs', map, name, start, size, payload: readLinedefs(buffer, start, size) }
        } else if (isEntry(name, 'SIDEDEFS')) {
          return { type: 'sidedefs', map, name, start, size, payload: readSidedefs(buffer, start, size) }
        } else if (isEntry(name, 'VERTEXES')) {
          return { type: 'vertexes', map, name, start, size, payload: readVertexes(buffer, start, size) }
        } else if (isEntry(name, 'SEGS')) {
          return { type: 'segments', map, name, start, size, payload: readSegments(buffer, start, size) }
        } else if (isEntry(name, 'SSECTORS')) {
          return { type: 'subsectors', map, name, start, size, payload: readSubsectors(buffer, start, size) }
        } else if (isEntry(name, 'SECTORS')) {
          return { type: 'sectors', map, name, start, size, payload: readSectors(buffer, start, size) }
        } else if (isEntry(name, /^BLOCKMAP|NODES|REJECT|BEHAVIOR|SCRIPTS/)) {
          return { type: 'ignoredmapdata', map, name, start, size }
        } else if (isEntry(name, 'ENDOOM')) {
          map = null
          return { type: 'endScreen', name, start, size }
        } else if (isEntry(name, /^E[0-9]M[0-9]|MAP[0-9]{2}/)) {
          map = name
          return { type: 'map', name, start, size }
        } else if (isEntry(name, 'S_START') || isEntry(name, 'SS_START') || isEntry(name, 'P_START') || isEntry(name, /^P[0-9]_START$/)) {
          map = null
          patches = true
          return { type: 'markerStart', name, start, size }
        } else if (isEntry(name, 'S_END') || isEntry(name, 'SS_END') || isEntry(name, 'P_END') || isEntry(name, /^P[0-9]_END$/)) {
          patches = false
          return { type: 'markerEnd', name, start, size }
        } else if (isEntry(name, 'F_START') || isEntry(name, 'FF_START') || isEntry(name, /^F[0-9]_START$/)) {
          map = null
          flats = true
          return { type: 'markerStart', name, start, size }
        } else if (isEntry(name, 'F_END') || isEntry(name, 'FF_END') || isEntry(name, /^F[0-9]_END$/)) {
          flats = false
          return { type: 'markerEnd', name, start, size }
        } else if (flats === true) {
          return { type: 'flat', name, start, size, payload: readFlat(buffer, start, size) }
        } else if (patches === true) {
          return { type: 'patch', name, start, size, payload: readPatch(buffer, start, size) }
        } else {
          map = null
          return { type: 'unknown', name, start, size, payload: buffer.slice(start, start + size) }
        }
      })

      return {
        name: fileName,
        version: version,
        entries: lumps
      }
    })
}

/**
 * Writes a .WAV file
 *
 * @param {string} filePath
 * @param {number} numSamples
 * @param {Buffer} samples
 * @param {number} [sampleRate=11025]
 * @param {number} [numChannels=1]
 * @param {number} [bitsPerSample=8]
 * @returns {}
 */
function writeWAV(filePath, numSamples, samples, sampleRate = 11025, numChannels = 1, bitsPerSample = 8) {
  const header = Buffer.alloc(48)

  const riffSize = 36 + (numSamples * numChannels * (bitsPerSample / 8))

  header.write('RIFF', 0)
  header.writeUInt32LE(riffSize, 4)
  header.write('WAVE', 8)

  header.write('fmt ', 12)
  header.writeUInt32LE(16, 16) // subchunk size.
  header.writeUInt16LE(1, 20) // audio format.
  header.writeUInt16LE(numChannels, 22) // num channels.
  header.writeUInt32LE(sampleRate, 24) // sample rate
  header.writeUInt32LE(sampleRate * numChannels * (bitsPerSample / 8), 28) // byte rate (== SampleRate * NumChannels * BitsPerSample/8)
  header.writeUInt16LE(numChannels * (bitsPerSample / 8), 32) // block align (== NumChannels * BitsPerSample/8)
  header.writeUInt16LE(bitsPerSample, 34) // bits per sample. 8 bits = 8, 16 bits = 16, etc.

  header.write('data', 36)
  header.writeUInt32LE(numSamples * numChannels * (bitsPerSample / 8), 40) // NumSamples * NumChannels * BitsPerSample/8

  return writeFile(filePath, Buffer.concat([
    header,
    samples
  ]))
}

/**
 * Writes a .TGA file
 *
 * @param {string} filePath - File path
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {Buffer} colorMap - Color map or palette to use
 * @param {Buffer} image - Bitmap data
 * @returns {Promise}
 */
function writeTGA(filePath, width, height, colorMap, image) {
  const header = Buffer.alloc(18)
  // Basic Spec
  header.writeUInt8(0, 0) // ID Length: 0
  header.writeUInt8(1, 1) // Color Map Type (0 - not present, 1 - present)
  header.writeUInt8(1, 2) // Image Type (0 - no data, 1 - uncompressed color mapped, 2 - uncompressed true color, 3 - uncompressed B&W)
  // Color Map Spec
  header.writeUInt16LE(0, 3) // Color Map First Entry Index
  header.writeUInt16LE(256, 5) // Color Map Length
  header.writeUInt8(24, 7) // Color Map Entry Size
  // Image Spec
  header.writeInt16LE(0, 8) // Image Origin X
  header.writeInt16LE(0, 10) // Image Origin Y
  header.writeInt16LE(width, 12) // Image Width
  header.writeInt16LE(height, 14) // Image Height

  header.writeUInt8(8, 16) // Pixel Depth
  header.writeUInt8(0b00110000, 17) // Image descriptor

  const footer = Buffer.alloc(26)
  // writes footer
  footer.writeUInt32LE(0, 0) // extension area offset
  footer.writeUInt32LE(0, 4) // developer area offset
  footer.write('TRUEVISION-XFILE.\u0000', 8)
  return writeFile(filePath, Buffer.concat([
    header,
    colorMap,
    image,
    footer
  ]))
}

/**
 * Converts a RGB buffer into a BGR buffer
 *
 * @param {Buffer} input - Input buffer
 * @param {Buffer} output - Output buffer
 * @returns {Buffer}
 */
function fromRGBToBGR(input, output) {
  for (let i = 0; i < input.byteLength; i += 3) {
    const r = input.readUInt8(i + 0)
    const g = input.readUInt8(i + 1)
    const b = input.readUInt8(i + 2)
    output.writeUInt8(b, i + 0)
    output.writeUInt8(g, i + 1)
    output.writeUInt8(r, i + 2)
  }
  return output
}

/**
 * Saves a DOOM map in JSON
 *
 * @param {string} filePath
 * @param {Array<Vertex>} vertices
 * @param {Array<Linedef>} linedefs
 * @param {Array<Sidedef>} sidedefs
 * @param {Array<Sector>} sectors
 * @param {Array<Thing>} things
 * @returns {Promise}
 */
function writeJSONMap(filePath, vertices, linedefs, sidedefs, sectors, things) {
  const wallsPerSector = []
  const map = {
    version: '1.0',
    author: 'Exported',
    contributors: [],
    created: (new Date()).toISOString(),
    modified: (new Date()).toISOString(),
    published: (new Date()).toISOString(),
    vertices: vertices.payload.map(vertex => [vertex.x, vertex.y]),
    walls: linedefs.payload.map((linedef, index) => {
      const right = sidedefs.payload[linedef.right] && sidedefs.payload[linedef.right].sector ? sidedefs.payload[linedef.right].sector : null
      const left = sidedefs.payload[linedef.left] && sidedefs.payload[linedef.left].sector ? sidedefs.payload[linedef.left].sector : null
      if (!wallsPerSector[right]) {
        wallsPerSector[right] = []
      }
      wallsPerSector[right].push(index)
      if (!wallsPerSector[left]) {
        wallsPerSector[left] = []
      }
      wallsPerSector[left].push(index)
      return {
        start: linedef.start,
        end: linedef.end,
        right: right,
        left: left,
        texture: null,
        offset: [0, 0],
        scale: [1, 1]
      }
    }),
    sectors: sectors.payload.map((sector, index) => {
      return {
        floor: {
          height: sector.floor.height,
          texture: null,
          offset: [0, 0],
          scale: [1, 1]
        },
        ceiling: {
          height: sector.ceiling.height,
          texture: null,
          offset: [0, 0],
          scale: [1, 1]
        },
        walls: wallsPerSector[index]
      }
    }),
    entities: things.payload.map((thing) => {
      return {
        type: ThingType[thing.type] || thing.type,
        position: [thing.x, thing.y],
        rotation: thing.angle
      }
    })
  }
  writeFile(filePath, JSON.stringify(map, null, 2))
}

// If you don't pass a WAD file, it should exit
const wadFile = process.argv[2]
if (!wadFile) {
  // eslint-disable-next-line
  console.log('You need to specify a WAD file') // groundskeeper-willie-disable-line
  process.exit(1)
}

/**
 * Returns a RegExp pattern
 *
 * @param {string} [re] - RegExp pattern
 * @returns {RegExp}
 */
function getRegExp(re) {
  if (!re) {
    return new RegExp('.*')
  }
  return new RegExp(re)
}

/**
 * Reads a WAD.
 */
readWAD(wadFile).then((wad) => {
  // eslint-disable-next-line
  console.log(wad.name, wad.version) // groundskeeper-willie-disable-line
  const action = process.argv[3]
  if (!action) {
    // eslint-disable-next-line
    console.log('You need to specify an action: list|extract') // groundskeeper-willie-disable-line
    process.exit(1)
  }
  const re = getRegExp(process.argv[4])
  const palettes = wad.entries.find(entry => entry.type === 'palettes')
  const [palette] = palettes.payload
  const defaultPalette = fromRGBToBGR(palette, Buffer.alloc(palette.byteLength))
  const entries = wad.entries.filter((entry) => re.test(entry.name))
  if (action === 'extract') {
    for (const entry of entries) {
      if (entry.type === 'patch') {
        writeTGA(`${entry.name}.tga`, entry.payload.width, entry.payload.height, defaultPalette, entry.payload.bitmap)
      } else if (entry.type === 'flat') {
        writeTGA(`${entry.name}.tga`, 64, 64, defaultPalette, entry.payload)
      } else if (entry.type === 'sound') {
        writeWAV(`${entry.name}.wav`, entry.payload.sampleCount, entry.payload.samples, entry.payload.sampleRate, 1, 0)
      } else if (entry.type === 'unknown') {
        /*
        if (isPatch(entry.payload, 0, entry.size)) {
          const { width, height, bitmap } = readPatch(entry.payload, 0, entry.size)
          writeTGA(`${entry.name}.tga`, width, height, defaultPalette, bitmap)
        } else if (isSound(entry.payload, 0, entry.size)) {
          const { sampleCount, sampleRate, samples } = readSound(entry.payload, 0, entry.size)
          writeWAV(`${entry.name}.wav`, sampleCount, samples, sampleRate, 1, 8)
        }
        */
        // eslint-disable-next-line
        console.warn(`WARN: ${entry.name} not extracted because if it is of an unknown type`) // groundskeeper-willie-disable-line
      } else if (entry.type === 'map') {
        const vertices = wad.entries.find((current) => current.map === entry.name && current.type === 'vertexes')
        const linedefs = wad.entries.find((current) => current.map === entry.name && current.type === 'linedefs')
        const sidedefs = wad.entries.find((current) => current.map === entry.name && current.type === 'sidedefs')
        const sectors = wad.entries.find((current) => current.map === entry.name && current.type === 'sectors')
        const things = wad.entries.find((current) => current.map === entry.name && current.type === 'things')
        writeJSONMap(`${entry.name}.json`, vertices, linedefs, sidedefs, sectors, things)
      }
    }
  } else if (action === 'list') {
    // eslint-disable-next-line
    console.log('Entry'.padEnd(16), 'Offset'.padEnd(16), 'Size'.padEnd(16)) // groundskeeper-willie-disable-line
    for (const entry of entries) {
      // eslint-disable-next-line
      console.log(entry.name.padEnd(16), entry.start.toString().padEnd(16), entry.size.toString().padEnd(16)) // groundskeeper-willie-disable-line
    }
  }
  // eslint-disable-next-line
  console.log('Made with :heart: by \x1B[0;31mROJO 2\x1B[0m')
}).catch((error) => {
  // eslint-disable-next-line
  console.error(error) // groundskeeper-willie-disable-line
})
